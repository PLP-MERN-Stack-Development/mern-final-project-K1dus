import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io(process.env.REACT_APP_API_URL.replace('/api', ''));

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', 'project123');

    socket.on('taskUpdated', (task) => {
      setTasks((prev) => prev.map(t => (t.id === task.id ? task : t)));
    });

    // Fetch initial tasks (placeholder)
    axios.get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then(res => setTasks(res.data))
      .catch(console.error);

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>Task Management</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
