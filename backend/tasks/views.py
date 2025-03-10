# tasks/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from django.utils import timezone
from .models import Task
from .serializers import TaskSerializer
from .permissions import IsOwnerOrReadOnly

class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and editing tasks.
    
    Provides complete CRUD operations:
    - List all tasks
    - Create new tasks
    - Retrieve specific tasks
    - Update tasks
    - Delete tasks
    """
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        # Return tasks created by the user or assigned to them
        user = self.request.user
        return Task.objects.filter(
            models.Q(created_by=user) | models.Q(assigned_to=user)
        )
    
    def perform_create(self, serializer):
        # Set the current user as the creator of the task
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['post'])
    def toggle_completion(self, request, pk=None):
        """
        Toggle the completion status of a task.
        
        POST /tasks/{id}/toggle_completion/
        """
        task = self.get_object()
        task.status = not task.status
        
        # Track completion timestamp if completed
        if task.status:
            task.completed_at = timezone.now()
        else:
            task.completed_at = None
        
        task.save()
        serializer = self.get_serializer(task)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def metrics(self, request):
        """
        Get task metrics for the current user.
        
        GET /tasks/metrics/
        """
        user = request.user
        queryset = self.get_queryset()
        
        total = queryset.count()
        completed = queryset.filter(status=True).count()
        pending = total - completed
        
        # Count overdue tasks - tasks with due dates in the past that aren't completed
        overdue = queryset.filter(
            status=False,
            due_date__lt=timezone.now()
        ).count()
        
        # Count tasks by priority
        priorities = {
            'high': queryset.filter(priority='high').count(),
            'medium': queryset.filter(priority='medium').count(),
            'low': queryset.filter(priority='low').count(),
        }
        
        return Response({
            'total': total,
            'completed': completed,
            'pending': pending,
            'overdue': overdue,
            'priorities': priorities
        })