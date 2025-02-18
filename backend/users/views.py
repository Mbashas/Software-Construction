# users/views.py
from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer

# Provides both GET (list) and POST (create) for users
class UserListCreate(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer