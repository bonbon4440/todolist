from rest_framework import serializers
from .models import TodoList

class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ['id', 'task_name', 'deadline']