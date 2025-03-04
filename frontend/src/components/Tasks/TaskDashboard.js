import React from 'react';
import { TaskProvider } from '../../context/TaskContext';
import TaskHeader from './TaskHeader';
import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import './TaskStyles.css';

const TaskDashboard = () => {
  return (
    <TaskProvider>
      <div className="papyrus-dashboard">
        <div className="papyrus-column-decorations left">
          <div className="column"></div>
          <div className="hieroglyph">𓀀</div>
          <div className="hieroglyph">𓃒</div>
          <div className="hieroglyph">𓆓</div>
          <div className="column"></div>
        </div>
        
        <div className="papyrus-content">
          <TaskHeader />
          <TaskStats />
          <NewTaskForm />
          <TaskList />
        </div>
        
        <div className="papyrus-column-decorations right">
          <div className="column"></div>
          <div className="hieroglyph">𓊵</div>
          <div className="hieroglyph">𓅓</div>
          <div className="hieroglyph">𓇋</div>
          <div className="column"></div>
        </div>
      </div>
    </TaskProvider>
  );
};

export default TaskDashboard;
