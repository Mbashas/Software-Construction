# backend/urls.py
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),  # Add this line
    path('users/', include('users.urls')),
    path('tasks/', include('tasks.urls')),
]