
from django.contrib import admin
from .models import Users
from .models import Room
from .models import Participants
from .models import Message
from .models import ResendMessage

# Register your models here.
admin.site.register(Users)
admin.site.register(Room)
admin.site.register(Participants)
admin.site.register(Message)
admin.site.register(ResendMessage)