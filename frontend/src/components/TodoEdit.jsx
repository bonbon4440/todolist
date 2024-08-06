import React, { useState } from 'react';
import axios from 'axios';

// This is when the user wants to edit a specific todo item
const TodoEdit = ({ todoData, refreshTodoList, changeEditTodoId }) => {

    // Declare states to keep track of the updated values
    const [newTask, setNewTask] = useState(todoData.task_name);
    const [newDeadline, setNewDeadline] = useState(todoData.deadline);

    // Send signal to the parent component
    const cancelEditTodo = () => {
        changeEditTodoId(0)
    };

    // Send a PUT request to the backend
    // Send a signal to refresh the todo list if request success
    const updateTodo = async () => {

        try {

            // Prepare the new values into a JavaScript object
            const newTodo = {
                id: todoData.id,
                taskName: newTask,
                deadline: newDeadline
            };

            // Send a PUT request to the backend and stores the response
            const response = await axios.put('http://127.0.0.1:8000/api/todolist/', newTodo);

            // If request success then refresh todo list (send GET request again)
            // And stop editing the todo item
            // Which should re-render the todo list
            if (response.status == 201 || response.status == 200) {
                changeEditTodoId(0);
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
        <form onSubmit={updateTodo}>
            <input
                type="text"
                defaultValue={todoData.task_name}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <input
                type="date"
                defaultValue={todoData.deadline}
                onChange={(e) => setNewDeadline(e.target.value)}
            />
            <button type="submit">=</button>
            <button onClick={cancelEditTodo}>X</button>
        </form>
    );
};

export default TodoEdit;