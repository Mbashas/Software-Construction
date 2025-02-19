# users/views.py
from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer

class UserListCreateView(generics.ListCreateAPIView):  # Make sure this name matches exactly
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer