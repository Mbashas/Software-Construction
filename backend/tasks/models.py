from django.db import models
from django.utils import timezone
from users.models import CustomUser

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)  # Allow blank descriptions
    status = models.BooleanField(default=False)  # False = pending, True = completed
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(blank=True, null=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    
    # Add the created_by field to track who created the task
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='created_tasks'
    )
    
    # Keep the assigned_to field but make it optional
    assigned_to = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        related_name='assigned_tasks',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        # Set completed_at when status changes to completed
        if self.status and not self.completed_at:
            self.completed_at = timezone.now()
        elif not self.status:
            self.completed_at = None
        super().save(*args, **kwargs)