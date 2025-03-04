from django.db import models
from django.conf import settings

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    status = models.BooleanField(default=False)  # False = pending, True = completed
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(blank=True, null=True)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='assigned_tasks'
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_tasks'
    )

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']
        
    def save(self, *args, **kwargs):
        """
        Override save method to handle potential database schema mismatches
        If database doesn't have certain fields, we'll handle gracefully
        """
        try:
            # Attempt standard save
            super().save(*args, **kwargs)
        except Exception as e:
            # If there's a database error, log it and try a safer approach
            import logging
            logging.error(f"Error saving task: {e}")
            
            # Try to identify fields mentioned in the error
            error_str = str(e)
            if 'no such column' in error_str:
                # Extract column name from error
                import re
                match = re.search(r'no such column: .*\.(.*)', error_str)
                if match:
                    field_name = match.group(1)
                    logging.warning(f"Field '{field_name}' missing from database schema")

            # Re-raise the exception since we can't automatically fix database schema
            raise