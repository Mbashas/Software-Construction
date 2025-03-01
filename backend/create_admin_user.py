#!/usr/bin/env python
import os
import django
import sys

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Import the necessary Django components
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

# Get the custom user model
User = get_user_model()

# Check if an admin user already exists
if User.objects.filter(username='admin').exists():
    print("Admin user already exists!")
    admin_user = User.objects.get(username='admin')
else:
    # Create a new admin user
    admin_user = User.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='admin'  # Set a secure password in production!
    )
    print("Admin user created successfully!")

# Create or get token for the admin user
token, created = Token.objects.get_or_create(user=admin_user)
if created:
    print(f"Token generated for admin user: {token.key}")
else:
    print(f"Existing token for admin user: {token.key}")

print("\nYou can now login with:")
print("Username: admin")
print("Password: admin")
