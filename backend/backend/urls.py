# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.api_root, name='api-root'),
    path('users/', include('users.urls')),
    path('tasks/', include('tasks.urls')),
]