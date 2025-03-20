import uuid
from django.contrib.auth import authenticate
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import User, Room
from .serializers import RoomSerializer
import os

# Create your views here.
ip_address = os.getenv('IP_ADDRESS')
        
@api_view(['POST'])
def register(request):
    # Get data from request
    username = request.data.get("user_name")
    email = request.data.get("user_email")
    password = request.data.get("user_password")

    # Validate required fields
    if not all([username, email, password]):
        return Response({
            "error": "Username, email and password are required"
        }, status=400)

    # Check if user exists
    if User.objects.filter(email=email).exists():
        return Response({"error": "User already exists"}, status=400)
    
    try:
        # Create user properly using all required fields
        user = User.objects.create_user(  # Use create_user instead of create
            username=username,
            email=email,
            password=password,  # No need to hash manually, create_user does it
            user_status=User.INACTIVE
        )

        # Generate token for verification
        token = Token.objects.create(user=user)
        verification_link = f"http://{ip_address}/endpoint/verify/{token.key}"

        # Send verification email
        send_mail(
            "Verify Your Email",
            f"Click this link to verify your email: {verification_link}",
            settings.DEFAULT_FROM_EMAIL,
            [email],
        )

        return Response({"message": "Check your email for verification"}, status=201)
    
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(["GET"])
def verify_email(request, token):
    try:
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        user.user_status = User.ACTIVE
        user.save()
        token_obj.delete()
        return Response({"message": "Email verified! You can now log in."})
    except:
        return Response({"error": "Invalid token"}, status=400)


@api_view(['POST'])
def login(request):
    email = request.data.get("user_email")
    password = request.data.get("user_password")
    
    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Get user by email
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Authenticate with username and password
    # Note: Django's authenticate expects username, but we're using email
    # If you're using AbstractUser, the username field is username, not email
    authenticated_user = authenticate(username=user.username, password=password)
    
    if not authenticated_user:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
    if authenticated_user.user_status != User.ACTIVE:
        return Response({"error": "Email not verified"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Generate JWT tokens (access + refresh)
    refresh = RefreshToken.for_user(authenticated_user)

    return Response({
        "access_token": str(refresh.access_token),
        "refresh_token": str(refresh),
    })
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({
        "id": user.id,
        "email": user.email,
        "username": user.username,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_room(request):
    user = request.user
    data = request.data

    unique_code = str(uuid.uuid4())  # FIXED: Generate a proper UUID string

    serializer = RoomSerializer(data={
        'topic': data.get('topic'),
        'unique_code': unique_code,
    })

    if serializer.is_valid():
        serializer.save(host=user)  # FIXED: Assign the User instance, not ID
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_room(request, room_id=None):  # request must be included as the first parameter
    try:
        room = Room.objects.get(unique_code=room_id)  # Use .get() if unique_code is unique
        serializer = RoomSerializer(room, many=False)  # many=False since it's a single object
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Room.DoesNotExist:
        return Response({"error": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
