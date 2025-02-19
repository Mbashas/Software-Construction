// src/pages/TasksPage.js
import React from 'react';
import { TaskList } from '../components/TaskList/TaskList';
import { useTasks } from '../hooks/useTasks';

export const TasksPage = () => {
  const { tasks, loading, page, setPage, filter, setFilter } = useTasks();

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        placeholder="Filter tasks..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <TaskList 
        tasks={tasks}
        onPageChange={setPage}
        currentPage={page}
      />
    </div>
  );
};