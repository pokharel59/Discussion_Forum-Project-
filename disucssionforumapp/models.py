from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
     ACTIVE = "Active"
     INACTIVE = "Inactive"
     USER_STATUS_CHOICES = [
          (ACTIVE, "Active"),
          (INACTIVE, "Inactive"),
     ]

     user_status = models.CharField(
          max_length=50,
          choices=USER_STATUS_CHOICES,
          default=ACTIVE,
          null=False
     )

class Room(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hosted_rooms')
    topic = models.CharField(max_length=255)
    unique_code = models.CharField(max_length=255, unique=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.topic

# class Participants(models.Model):
#     room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='participants')
#     user = models.ForeignKey(ForumUser, on_delete=models.CASCADE, related_name='participations')
#     ready = models.BooleanField(default=False)
#     joined_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.username} in {self.room.topic}"

# class Message(models.Model):
#     room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
#     sender = models.ForeignKey(ForumUser, on_delete=models.CASCADE, related_name='sent_messages')
#     text = models.CharField(max_length=255)
#     sent_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Message from {self.sender.username} in {self.room.topic}"

# class ResendMessage(models.Model):
#     message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='resend_requests')
#     requester = models.ForeignKey(ForumUser, on_delete=models.CASCADE, related_name='resend_requests')
#     sender = models.ForeignKey(ForumUser, on_delete=models.CASCADE, related_name='resent_messages')
#     send_at = models.DateTimeField()
#     text = models.CharField(max_length=255)

#     def __str__(self):
#         return f"Resend request for message {self.message.id} by {self.requester.username}"

