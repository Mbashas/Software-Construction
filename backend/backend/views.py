# backend/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    """
    Root API endpoint listing all available resources
    """
    return Response({
        'users': reverse('user-list', request=request, format=format) if 'user-list' in request.resolver_match.resolver.reverse_dict else '/users/',
        'tasks': reverse('task-list', request=request, format=format) if 'task-list' in request.resolver_match.resolver.reverse_dict else '/tasks/',
    })