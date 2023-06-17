import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Header from './header';

const Store = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask) {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText('');
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setEditingIndex(index);
    setEditingText(taskToEdit);
  }

  const handleEditingChange = (event) => {
    setEditingText(event.target.value);
  };

  const handleSaveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <form onSubmit={handleAddTask}>
          <input type="text" value={newTask} onChange={handleInputChange} />
          <button onClick={handleAddTask}>Add Task</button>
        </form>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input 
                type="text" 
                value={editingText} 
                onChange={handleEditingChange}
              />
            ) : (
              <>
                {task}
                <button onClick={() => handleEditTask(index)}>Edit</button>
              </>
            )}
            {editingIndex === index && (
              <button onClick={() => handleSaveTask(index)}>Save</button>
            )}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => (
  <div id="app">
    <Header />
    <main>
      <Store />
    </main>
  </div>
);

export default App;

