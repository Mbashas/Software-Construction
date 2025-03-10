from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    Read permissions are allowed for users assigned to the task.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to the creator and assigned user
        if request.method in permissions.SAFE_METHODS:
            return (obj.created_by == request.user or 
                   (obj.assigned_to and obj.assigned_to == request.user))
        
        # Write permissions are only allowed to the creator
        return obj.created_by == request.user
