import React, { useState } from 'react';

const TodoList = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState(''); // Track the new task input

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo(''); // Clear input field after adding
    }
  };

  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo(); // Add todo on Enter key press
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <ul className="space-y-4 text-base">
        {todos.map((todo, index) => (
          <li key={index} className="flex space-x-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(index)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span
              className={`flex-1 ${todo.completed ? 'line-through text-gray-500 text-sm' : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(index)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add Task Input */}
      <div className="mt-6 flex bg-black">
        <input
          type="text"
          placeholder="Add a task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // Update input state
          onKeyDown={handleKeyDown} // Detect Enter key press
          className="flex-1 p-2 text-white bg-black"
        />
      </div>
    </div>
  );
};

export default TodoList;
