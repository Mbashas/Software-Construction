// src/App.js
import React from 'react';
import { UsersPage } from './pages/UsersPage';
import { TasksPage } from './pages/TasksPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <h1>Task Management System</h1>
      </nav>
      <main>
        <UsersPage />
        <TasksPage />
      </main>
    </div>
  );
}

export default App;