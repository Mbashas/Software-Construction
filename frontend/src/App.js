// src/App.js
import React from 'react';
import { UsersPage } from './pages/UsersPage';
import { TasksPage } from './pages/TasksPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TaskMaster Pro</h1>
        <p>Tame the chaos, one (and a half!) task at a time. 🚀</p>
      </header>
      <main className="App-main">
        <section className="App-section">
          <h2>Meet the Crew (aka Users)</h2>
          <UsersPage />
        </section>
        <section className="App-section">
          <h2>Quest Log (aka Tasks)</h2>
          <TasksPage />
        </section>
      </main>
      <footer className="App-footer">
        <p>&copy; 2025 TaskMaster Pro - Conquering to-dos since tomorrow. 😉</p>
      </footer>
    </div>
  );
}

export default App;