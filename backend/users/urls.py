# users/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserListCreateView.as_view(), name='users-list'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('me/', views.current_user, name='current-user'),
    path('<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('password/change/', views.change_password, name='change-password'),
]