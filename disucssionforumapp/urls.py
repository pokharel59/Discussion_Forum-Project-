from django.urls import path
from views import user_info

#This is demo url endpoint.
urlpatterns = [
    path("user/", user_info, name="user"),  # Add a simple view for testing
]
