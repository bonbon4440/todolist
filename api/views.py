from django.shortcuts import render
from .models import TodoList
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.dateparse import parse_date
from .models import TodoList
import json

from rest_framework import viewsets
from .serializers import TodoListSerializer

# Create your views here.

# Serve the frontend webpage
def index(request):
    return render(request, 'index.html')

# API for performing CRUD operations on the database
@csrf_exempt
def todolist(request):

    # If GET request
    if request.method == 'GET':
        
        # Get all data from the model
        todos = TodoList.objects.all().values

        # Get all data from the model and convert to a list of dictionaries

        # Fetch all the fields we need and returns a QuerySet of dictionaries
        todos = TodoList.objects.all().values('id', 'task_name', 'deadline')

        # Convert the QuerySet into a list of dictionaries
        todos_list = list(todos)
        
        # Send JSON response back to the client
        return JsonResponse(todos_list, safe=False, status=200)

    # If POST request
    elif request.method == 'POST':
        
        try:

            # Convert the incoming JSON data
            data = json.loads(request.body)

            # Get the deadline and convert to the date field format
            deadline_str = data.get('deadline')
            if deadline_str is not None and deadline_str != '':
                deadline = parse_date(deadline_str)
            else:
                deadline = None

            # The frontend generally does not have to specify the ID of the
            # new data entry that is to be created
            # The database will automatically assign and handle the
            # management of ID numbers in an increasing manner

            # Create a new data entry for the model and save it to the database
            todo = TodoList.objects.create(

                # These must match with the fields in models.py
                task_name=data.get('taskName'),

                # Use the converted deadline from earlier
                deadline=deadline
            )

            # Return response indicating that the process was successful
            return JsonResponse({'message': 'Success'}, status=201)

        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)

    # If PUT request
    elif request.method == 'PUT':
        
        try:
            
            # Convert the incoming JSON data
            data = json.loads(request.body)

            # Get the deadline and convert to the date field format
            deadline_str = data.get('deadline')
            if deadline_str is not None and deadline_str != '':
                deadline = parse_date(deadline_str)
            else:
                deadline = None

            # Get the ID of the item that needs to be updated
            todo_id = data.get('id')

            # Get the existing todo item
            todo = TodoList.objects.get(id=todo_id)

            # Update the data
            todo.task_name = data.get('taskName')
            todo.deadline = deadline
            todo.save()

            return JsonResponse({'message': 'Success'}, status=200)

        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)

# API for deleting a todo item
# todo_id will be passed via the URL parameter
@csrf_exempt
def deleteTodo(request, todo_id):

    # If DELETE request
    if request.method == 'DELETE':
        
        try:

            # Get the existing todo item
            todo = TodoList.objects.get(id=todo_id)

            # Delete the data
            todo.delete()

            # Deleting the data will leave an empty hole in the ID
            # The database will just leave that ID number unused forever and will
            # just keep increasing the ID number instead

            return JsonResponse({'message': 'Success'}, status=200)

        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)
        
# Viewset handles all CRUD operations on the todolist model
class TodoListViewSet(viewsets.ModelViewSet):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer