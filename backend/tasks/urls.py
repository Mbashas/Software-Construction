# tasks/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.TaskListCreateView.as_view(), name='tasks-list'),
]