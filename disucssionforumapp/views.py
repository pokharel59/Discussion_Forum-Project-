# discussionforumapp/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Discussion, Comment, User
from .serializers import DiscussionSerializer, CommentSerializer, UserSerializer

# Function to register a user
@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully!", "user": serializer.data})
    return Response(serializer.errors, status=400)
    
# Function to handle creating and listing discussions
@api_view(['GET', 'POST'])
def discussion_list_create(request):
    if request.method == 'GET':
        discussions = Discussion.objects.all()
        serializer = DiscussionSerializer(discussions, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = DiscussionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# Function to handle creating and listing comments
@api_view(['GET', 'POST'])
def comment_list_create(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
