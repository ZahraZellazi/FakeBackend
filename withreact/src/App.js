import "./App.css";
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { getAlltodos, addTodoApi, deleteTodoApi, updateTodoApi } from "./api services/api.js";
const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAlltodos()
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = (title) => {
    const newTodo = {
      title: title,
      completed: false,
      userId: 1,
    };

    addTodoApi(newTodo)
      .then((addedTodo) => {
        setTodos([...todos, addedTodo]);
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const toggleComplete = (id) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    if (updatedTodo) {
      const updatedTodoData = { ...updatedTodo, completed: !updatedTodo.completed };

      updateTodoApi(id, updatedTodoData)
        .then(() => {
          setTodos(todos.map(todo =>
            todo.id === id ? updatedTodoData : todo
          ));
        })
        .catch((error) => console.error("Error updating todo:", error));
    }
  };

  const updateTodo = (id, updatedTodo) => {
    updateTodoApi(id, updatedTodo)
      .then(() => {
        setTodos(todos.map(todo =>
          todo.id === id ? updatedTodo : todo
        ));
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const deleteTodo = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      deleteTodoApi(id)
        .then(() => {
          setTodos(todos.filter(todo => todo.id !== id));
        })
        .catch((error) => console.error("Error deleting todo:", error));
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default App;