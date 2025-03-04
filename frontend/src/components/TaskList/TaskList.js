import React, { useState, useEffect } from 'react';
import './TaskList.css';

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading for demo purposes
    const loadTasks = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In production, replace with API call
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        // Mock task data with ancient theme
        const mockTasks = [
          {
            id: 1,
            title: "Transcribe Ancient Scrolls",
            description: "Carefully document the contents of the recently discovered papyri from the Temple of Horus.",
            due_date: new Date(2025, 5, 15).toISOString(),
            completed: false,
            priority: "high"
          },
          {
            id: 2,
            title: "Catalog Artifacts from Giza Excavation",
            description: "Sort and catalog the artifacts recovered from the eastern chamber according to dynasty and purpose.",
            due_date: new Date(2025, 4, 28).toISOString(),
            completed: true,
            priority: "medium"
          },
          {
            id: 3,
            title: "Prepare Exhibition Materials",
            description: "Create descriptive placards for the upcoming 'Wonders of Alexandria' exhibition at the Grand Museum.",
            due_date: new Date(2025, 6, 10).toISOString(),
            completed: false,
            priority: "high"
          },
          {
            id: 4,
            title: "Research Ptolemaic Coinage Patterns",
            description: "Analyze the distribution and iconography of coins during the early Ptolemaic period.",
            due_date: null,
            completed: false,
            priority: "low"
          },
          {
            id: 5,
            title: "Translate Demotic Inscriptions",
            description: "Complete translations of the demotic writings found on the limestone stela from the Nile Delta site.",
            due_date: new Date(2025, 5, 30).toISOString(),
            completed: false,
            priority: "medium"
          }
        ];
        
        setTasks(mockTasks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to retrieve your scrolls. The scribes apologize for the delay.');
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Convert ISO date to formatted date string
  const formatDate = (isoDate) => {
    if (!isoDate) return "No date specified";
    
    const date = new Date(isoDate);
    
    // Format in ancient style
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    return `${day} ${month}, Year ${year}`;
  };

  if (loading) {
    return (
      <div className="ancient-task-container">
        <div className="ancient-symbols-container">
          <span className="ancient-symbol ancient-symbol-left">𓀀</span>
          <span className="ancient-symbol ancient-symbol-right">𓃒</span>
        </div>
        <div className="ancient-task-header">
          <h1 className="ancient-task-title">Sacred Scrolls</h1>
          <p className="ancient-task-subtitle">The scribe is retrieving your tasks from the archives...</p>
        </div>
        <div className="ancient-loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ancient-task-container">
        <div className="ancient-symbols-container">
          <span className="ancient-symbol ancient-symbol-left">𓀀</span>
          <span className="ancient-symbol ancient-symbol-right">𓃒</span>
        </div>
        <div className="ancient-task-header">
          <h1 className="ancient-task-title">Sacred Scrolls</h1>
        </div>
        <div className="ancient-error">{error}</div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="ancient-task-container">
        <div className="ancient-symbols-container">
          <span className="ancient-symbol ancient-symbol-left">𓀀</span>
          <span className="ancient-symbol ancient-symbol-right">𓃒</span>
        </div>
        <div className="ancient-task-header">
          <h1 className="ancient-task-title">Sacred Scrolls</h1>
          <p className="ancient-task-subtitle">Your tablets of destiny await inscription</p>
        </div>
        
        <div className="ancient-task-placeholder">
          <div className="ancient-placeholder-icon"></div>
          <h2>The Papyrus Awaits Your Inscription</h2>
          <p>There are no tasks recorded in the archives. Begin by adding a new decree to your scrolls.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ancient-task-container">
      <div className="ancient-symbols-container">
        <span className="ancient-symbol ancient-symbol-left">𓀀</span>
        <span className="ancient-symbol ancient-symbol-right">𓃒</span>
      </div>
      
      <div className="ancient-task-header">
        <h1 className="ancient-task-title">Sacred Scrolls</h1>
        <p className="ancient-task-subtitle">Record of your divine duties and obligations</p>
      </div>
      
      <div className="ancient-divider">𓆓</div>
      
      <div className="ancient-task-list">
        <h2>Ongoing Endeavors</h2>
        
        {tasks.map((task, index) => (
          <div 
            key={task.id} 
            className="ancient-task-card" 
            style={{"--index": index}}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="ancient-task-meta">
              <span className={`ancient-status ${task.completed ? 'ancient-status-completed' : 'ancient-status-pending'}`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
              <span className="ancient-date">
                {formatDate(task.due_date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};