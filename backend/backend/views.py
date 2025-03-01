# backend/views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    """
    API root endpoint providing links to all main endpoints
    """
    return Response({
        'users': reverse('customuser-list', request=request, format=format),
        'tasks': reverse('task-list', request=request, format=format),
        'login': reverse('login', request=request, format=format),
        'register': reverse('register', request=request, format=format),
    })