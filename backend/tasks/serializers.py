from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Task

User = get_user_model()

class TaskSerializer(serializers.ModelSerializer):
    created_by_username = serializers.ReadOnlyField(source='created_by.username')
    assigned_to_username = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'status', 'priority',
            'created_at', 'due_date', 'completed_at',
            'created_by', 'created_by_username',
            'assigned_to', 'assigned_to_username'
        ]
        read_only_fields = ['created_at', 'completed_at', 'created_by', 'created_by_username']
    
    def get_assigned_to_username(self, obj):
        if obj.assigned_to:
            return obj.assigned_to.username
        return None
    
    def validate_assigned_to(self, value):
        if value and not User.objects.filter(id=value.id).exists():
            raise serializers.ValidationError(f"User with ID {value.id} does not exist")
        return value
