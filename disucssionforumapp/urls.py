# urls.py
from django.urls import path
from .views import register_user, discussion_list_create, comment_list_create

urlpatterns = [
    path('register/', register_user, name='register_user'),

    path('discussions/', discussion_list_create, name='discussions'),

    path('comments/', comment_list_create, name='comments'),
]
