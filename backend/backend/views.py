# backend/views.py
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'users_endpoint': '/users/',
        'tasks_endpoint': '/tasks/'
    })