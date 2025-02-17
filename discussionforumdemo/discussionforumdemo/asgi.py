# asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from disucssionforumapp.routing import websocket_urlpatterns  # replace 'your_app' with your actual app name

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'discussionforumdemo.settings')  # replace with your project name

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})