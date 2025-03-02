from channels.generic.websocket import AsyncWebsocketConsumer # Base class for handling WebSocket connections asynchronously
from django.contrib.auth.models import AnonymousUser # Django's representation of a non-authenticated user
from rest_framework_simplejwt.tokens import AccessToken # JWT token handling from the rest_framework_simplejwt package
from channels.db import database_sync_to_async # Decorator to safely run database operations in an async context
import json # parsing and serializing JSON data

class YourConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name'] # Extracts the room name from the WebSocket URL
        self.room_group_name = f"chat_{self.room_name}" # Creates a unique group name for this chat room
        self.user = AnonymousUser() # Initializes the user as anonymous

        # Add user to the group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
    
    async def disconnect(self, close_code):
        # Remove user from the group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            
            # Handle authentication
            if data.get("type") == "authenticate":
                token = data.get("token")
                self.user = await self.get_user_from_token(token)

                if self.user.is_authenticated:
                    await self.send(text_data=json.dumps({
                        "type": "auth_success",
                        "user": {
                            "id": self.user.id,
                            "username": self.user.username,
                            "user_email": self.user.email
                        }
                    }))
                else:
                    await self.send(text_data=json.dumps({
                        "type": "auth_fail",
                        "message": "Authentication failed"
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