from django.urls import path
from . import views

urlpatterns = [

    # Serve the frontend webpage
    path('index/', views.index, name='index'),

    # Access the backend API for performing CRUD operations
    path('todolist/', views.todolist, name='todolist'),

    # Specifically for the DELETE request
    # Because we are not allowed to send JSON with DELETE request
    path('todolist/<int:todo_id>/', views.deleteTodo, name='todolist')
    
]