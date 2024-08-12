from django.urls import path, include
from rest_framework import routers
from . import views

# Router for the backend API viewset
router = routers.DefaultRouter()

# GET /todolist/
# POST /todolist/
# GET /todolist/{id}/
# PUT /todolist/{id}/
# DELETE /todolist/{id}/
router.register(r'todolist', views.TodoListViewSet)

urlpatterns = [

    # Serve the frontend webpage
    path('index/', views.index, name='index'),

    # Access the backend API for performing CRUD operations
    # path('todolist/', views.todolist, name='todolist'),

    # Specifically for the DELETE request
    # Because we are not allowed to send JSON with DELETE request
    # path('todolist/<int:todo_id>/', views.deleteTodo, name='todolist')

    # Path for backend API viewset
    path('', include(router.urls))
    
]