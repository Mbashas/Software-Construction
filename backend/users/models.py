from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    groups = models.ManyToManyField(
        Group,
        blank=True,
        related_name="customuser_groups"
    )
    user_permissions = models.ManyToManyField(
        Permission,
        blank=True,
        related_name="customuser_permissions"
    )