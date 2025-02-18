# discussionforumapp/serializers.py
from rest_framework import serializers
from .models import User, Discussion, Comment

# Serializer to convert User model to JSON format
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']  # You can add 'password' for registration

# Serializer to convert Discussion model to JSON format
class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = ['id', 'user', 'title', 'content', 'created_at']

# Serializer to convert Comment model to JSON format
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'discussion', 'user', 'text', 'created_at']
