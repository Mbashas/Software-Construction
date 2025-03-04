# tasks/views.py
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from django.db import models  # Add this import for models.Q
from .models import Task
from .serializers import TaskSerializer
from .permissions import IsOwnerOrReadOnly

class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and editing tasks
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        # Return tasks created by the user or assigned to them
        user = self.request.user
        return Task.objects.filter(
            models.Q(created_by=user) | models.Q(assigned_to=user)
        )
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context