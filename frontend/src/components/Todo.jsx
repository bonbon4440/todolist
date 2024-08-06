import React from 'react';
import axios from 'axios';

// This is the todo item component
// Displays the task name, deadline, buttons, etc.
const Todo = ({ todoData, refreshTodoList, changeEditTodoId }) => {

    // Send signal to the parent component that we will be editing this
    const editTodo = () => {
        console.log('edit todo function running');
        console.log(todoData.id);
        changeEditTodoId(todoData.id);
        console.log('after set edit todo id');
    };

    // Send a DELETE request to the backend
    // Send a signal to refresh the todo list if request success
    const deleteTodo = async () => {

        try {

            // Send a DELETE request to the backend and stores the response
            const response = await axios.delete(`http://127.0.0.1:8000/api/todolist/${todoData.id}`);

            // If request success then refresh todo list (send GET request again)
            // Which should re-render the todo list
            if (response.status == 201 || response.status == 200) {
                refreshTodoList();
            }

            // If request fail
            else {
                console.log(response.data);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <span>{todoData.task_name}</span>
            <span>{todoData.deadline}</span>
            <button onClick={editTodo}>=</button>
            <button onClick={deleteTodo}>X</button>
        </div>
    );
};

export default Todo;