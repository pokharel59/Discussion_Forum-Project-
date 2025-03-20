from collections import defaultdict
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
import json

class YourConsumer(AsyncWebsocketConsumer):
    # Dictionary to keep track of users in each room
    # This will be a class variable shared across all instances
    room_users = defaultdict(dict)
    
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        # Add user to the group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

         # Initialize room in room_users dict if it doesn't exist
        if self.room_group_name not in YourConsumer.room_users:
            YourConsumer.room_users[self.room_group_name] = {}

        await self.accept()
    
    async def disconnect(self, close_code):
        # Only remove user if they were authenticated
        if hasattr(self, 'user') and self.user.is_authenticated:
            if self.room_group_name in YourConsumer.room_users and str(self.user.id) in YourConsumer.room_users[self.room_group_name]:
                # Remove user from room users
                del YourConsumer.room_users[self.room_group_name][str(self.user.id)]
                
                # Broadcast leave message only if user was in the room and not just navigating
                if not close_code == 1001:  # Normal navigation closure
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            "type": "user_leave",
                            "user_id": self.user.id,
                            "username": self.user.username,
                        }
                    )
        
        # Discard from the group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            
            # Handle authentication
            if data.get("type") == "authenticate":
                token = data.get("token")
                self.user = await self.get_user_from_token(token)

                if self.user.is_authenticated:
                    # Add user to room_users dictionary
                    YourConsumer.room_users[self.room_group_name][str(self.user.id)] = {
                        "id": self.user.id,
                        "user_id": self.user.id,
                        "username": self.user.username,
                        "email": self.user.email,
                    }
                    
                    # Send success message with list of existing users to the newly joined user
                    existing_users = list(YourConsumer.room_users[self.room_group_name].values())
                    
                    await self.send(text_data=json.dumps({
                        "type": "auth_success",
                        "user": {
                            "id": self.user.id,
                            "username": self.user.username,
                            "user_email": self.user.email,
                        },
                        "existing_users": existing_users

                    }))
                    
                    # Broadcast user join event to the room
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            "type": "user_join",
                            "user_id": self.user.id,
                            "username": self.user.username,
                        }
                    )
                else:
                    await self.send(text_data=json.dumps({
                        "type": "auth_fail",
                        "message": "Authentication failed"
                    }))
            
            # Handle request for room users list
            elif data.get("type") == "get_room_users":
                if not hasattr(self, 'user') or not self.user.is_authenticated:
                    await self.send(text_data=json.dumps({
                        "type": "error",
                        "message": "You need to authenticate first"
                    }))
                    return
                
                # Send list of users in the room
                if self.room_group_name in YourConsumer.room_users:
                    existing_users = list(YourConsumer.room_users[self.room_group_name].values())
                    await self.send(text_data=json.dumps({
                        "type": "room_users",
                        "users": existing_users
                    }))
            
            # Handle chat messages
            elif data.get("type") == "chat_message":
                # Check if user is authenticated
                if not hasattr(self, 'user') or not self.user.is_authenticated:
                    await self.send(text_data=json.dumps({
                        "type": "error",
                        "message": "You need to authenticate first"
                    }))
                    return
                
                message = data.get("message", "")
                
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "message": message,
                        "user_id": self.user.id,
                        "username": self.user.username
                    }
                )

        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "Invalid JSON"
            }))
        except Exception as e:
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": f"An error occurred: {str(e)}"
            }))

    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "type": "chat_message",
            "message": event["message"],
            "user_id": event.get("user_id"),
            "username": event.get("username")
        }))

    @database_sync_to_async
    def get_user_from_token(self, token):
        try:
            # Verify the token
            access_token = AccessToken(token)
            
            # Get the User model dynamically to avoid import issues
            from django.contrib.auth import get_user_model
            User = get_user_model()
            
            # Get the user from the token
            user = User.objects.get(id=access_token["user_id"])
            return user
        except Exception as e:
            print(f"Authentication error: {str(e)}")
            return AnonymousUser()
        
    async def user_join(self, event):
        await self.send(text_data=json.dumps({
            "type": "user_join",
            "user_id": event["user_id"],
            "username": event["username"],
            "message": f"{event['username']} has joined the chat."
        }))
        
    async def user_leave(self, event):
        await self.send(text_data=json.dumps({
            "type": "user_leave",
            "user_id": event["user_id"],
            "username": event["username"],
            "message": f"{event['username']} has left the chat."
        }))