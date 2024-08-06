import React, { useState } from 'react';
import axios from 'axios';

// This is the UI area where the user can add more todo items
// refreshTodoList() is a function passed down from TodoWrapper parent
// component to update the whole TodoList
const TodoForm = ({ refreshTodoList }) => {

    // Declare states in order to store the input values inside
    // JavaScript variables
    // These stored values will be sent to the backend API later
    const [taskName, setTaskName] = useState('');
    const [deadline, setDeadline] = useState('');

    // Handle the form submission
    // Send the data stored in the states to the backend
    // Don't forget to mark the function as async
    const handleSubmit = async (e) => {
        console.log('Before prevent default');

        e.preventDefault();

        console.log('After prevent default but right before try');

        try {

            console.log('Preparing to send POST request');

            // Prepare data from the states into a JavaScript object
            const newTodo = {
                taskName: taskName,
                deadline: deadline
            };

            console.log(newTodo);

            // Send POST request to the backend along with the object
            // Axios will convert the object into JSON
            // Store the incoming response in this variable "response"
            const response = await axios.post('http://127.0.0.1:8000/api/todolist/', newTodo);

            // Check the incoming response
            // If request success then refresh todo list (send GET request again)
            if (response.status == 201 || response.status == 200) {
                refreshTodoList();
            }

            // If request fail
            else {
                console.error(response.data);
            }

        } catch (error) {
            console.error(error);
        }
    };

    // Calls handleSubmit() when the user presses submit button
    // Updates the states whenever the user inputs anything
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="What is the task today?"
            onChange={(e) => setTaskName(e.target.value)} required />
            <input type="date" onChange={(e) => setDeadline(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
    );
};

export default TodoForm;
