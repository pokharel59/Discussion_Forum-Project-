from django.db import serializers
from .models import Users, Room, Participants, Message, ResendMessage

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'google_id', 'created_at']

class RoomSerializer(serializers.ModelSerializer):
    host = UsersSerializer(read_only=True)

    class Meta:
        model = Room
        fields = ['id', 'host', 'topic', 'unique_code', 'timer_duration', 'created_at']

class ParticipantSerializer(serializers.ModelSerializer):
    user = UsersSerializer(read_only=True)
    room = RoomSerializer(read_only=True)

    class Meta:
        model = Participants
        fields = ['id', 'room', 'user', 'ready', 'joined_at']

class MessageSerializer(serializers.ModelSerializer):
    sender = UsersSerializer(read_only=True)
    room = RoomSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'room', 'sender', 'text', 'sent_at']

class ResendMessageSerializer(serializers.ModelSerializer):
    message = MessageSerializer(read_only=True)
    requester = UsersSerializer(read_only=True)
    sender = UsersSerializer(read_only=True)

    class Meta:
        model = ResendMessage
        fields = ['id', 'message', 'requester', 'sender', 'send_at', 'text']
