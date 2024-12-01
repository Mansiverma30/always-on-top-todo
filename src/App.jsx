import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList.jsx';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Get todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem("todos"));

    // If there are todos in localStorage, set them in state
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="min-h-screen">
      <h1 className="text-lg font-bold mb-2 ml-5">To-Do List</h1>
      <div className="bg-black min-h-screen justify-items-start">
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default App;
