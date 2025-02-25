# tasks/views.py
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer

# Rename this class to match what's used in urls.py
class TaskListCreate(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer