from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

#This is dummy import of models they are not available
from .models import User
from .serializers import UserSerializer

#This is demo function the endpoint is registered in urls.py in disucssionforumapp
@api_view(['GET'])
def user_info(request):
        subjects = User.objects.all()
        serializer = UserSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#Based on this example we can create other views.py