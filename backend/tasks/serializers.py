from rest_framework import serializers
from .models import Task
from django.contrib.auth import get_user_model

User = get_user_model()

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.CharField(source='assigned_to.username', allow_null=True, required=False)
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'priority', 
                 'created_at', 'due_date', 'assigned_to']
    
    def create(self, validated_data):
        # Handle assigned_to as username string
        assigned_to_data = validated_data.pop('assigned_to', None)
        if assigned_to_data and assigned_to_data.get('username'):
            try:
                assigned_to_user = User.objects.get(username=assigned_to_data['username'])
                validated_data['assigned_to'] = assigned_to_user
            except User.DoesNotExist:
                raise serializers.ValidationError({'assigned_to': 'User does not exist'})
        
        # Set created_by to the current user
        validated_data['created_by'] = self.context['request'].user
        
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        # Handle assigned_to as username string
        assigned_to_data = validated_data.pop('assigned_to', None)
        if assigned_to_data and assigned_to_data.get('username'):
            try:
                assigned_to_user = User.objects.get(username=assigned_to_data['username'])
                validated_data['assigned_to'] = assigned_to_user
            except User.DoesNotExist:
                raise serializers.ValidationError({'assigned_to': 'User does not exist'})
        elif assigned_to_data is not None and assigned_to_data.get('username') == '':
            # If empty string is provided, set to None
            validated_data['assigned_to'] = None
        
        return super().update(instance, validated_data)
