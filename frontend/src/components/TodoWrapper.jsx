import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import TodoEdit from './TodoEdit';
import axios from 'axios';

// This is the outermost component for the whole todo list
// Contains functions that manage the todo components
const TodoWrapper = () => {

    // This list stores the todo data received from the backend
    // The default value is an empty list []
    // The whole component will re-render when any of the state changes
    // So it should automatically update the todo list
    const [todos, setTodos] = useState([]);

    // This state tracks which todo item ID is being edited
    // Set to 0 if nothing is being edited
    const [editTodoId, setEditTodoId] = useState(0);

    // This will be passed to children components so that they can
    // edit the existing todo items
    const changeEditTodoId = (newId) => {
        setEditTodoId(newId);
    };

    // Send GET request to the backend and update the todo items
    const refreshTodoList = async () => {
        
        try {

            // Send GET request to the backend
            // Store the incoming response in this variable "response"
            const response = await axios.get('http://127.0.0.1:8000/api/todolist/');
            console.log(response.data);

            // Update the state which should re-render the todo list
            setTodos(response.data);
            console.log(todos);

        }
        catch (error) {
            console.error(error);
        }
    };

    // Call this when mounting the component for the first time
    useEffect(() => {
        refreshTodoList();
    }, []);

    return (
        <div>
            <h1>Get Things Done !!</h1>
            <TodoForm refreshTodoList={refreshTodoList} />
            <div>
                {todos.map((todo) => {
                    if (editTodoId == todo.id) {
                        return (<TodoEdit todoData={todo} refreshTodoList={refreshTodoList} changeEditTodoId={changeEditTodoId} />);
                    } else {
                        return (<Todo todoData={todo} refreshTodoList={refreshTodoList} changeEditTodoId={changeEditTodoId} />);
                    }
                })}
            </div>
        </div>
    );
};

export default TodoWrapper;
