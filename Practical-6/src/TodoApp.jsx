import React, { useState } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' }
  ]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: editText } : task));
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Get Things Done !</h1>
      <form className="todo-form" onSubmit={handleAddTask}>
        <input
          className="todo-input"
          type="text"
          placeholder="What is the task today?"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="todo-add-btn" type="submit">Add Task</button>
      </form>
      <div className="todo-list">
        {tasks.map(task => (
          <div className="todo-item" key={task.id}>
            {editId === task.id ? (
              <>
                <input
                  className="todo-edit-input"
                  value={editText}
                  onChange={handleEditChange}
                  onBlur={() => handleEditSubmit(task.id)}
                  autoFocus
                />
                <button className="todo-save-btn" onClick={() => handleEditSubmit(task.id)} title="Save">
                  💾
                </button>
              </>
            ) : (
              <>
                <span className="todo-text">{task.text}</span>
                <button className="todo-edit-btn" onClick={() => handleEdit(task.id, task.text)} title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M5 19h14v2H5v-2zm2.414-7.414l1.414 1.414L17.414 5.414a2 2 0 0 0-2.828-2.828L5.586 10.172l1.414 1.414zM19.707 7.293a1 1 0 0 0-1.414 0l-1.086 1.086 1.414 1.414 1.086-1.086a1 1 0 0 0 0-1.414z"/></svg>
                </button>
                <button className="todo-delete-btn" onClick={() => handleDelete(task.id)} title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zm3-9h2v7h-2V10zm4 0h2v7h-2V10zm3-5V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H3v2h18V5h-4z"/></svg>
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
