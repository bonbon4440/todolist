from django.db import models

# Create your models here.
class TodoList(models.Model):
    task_name = models.CharField(max_length=40)
    deadline = models.DateField(null=True, blank=True)