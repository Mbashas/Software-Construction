import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TaskList.module.css';
import './TaskList.css';

export const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/tasks/');
                setTasks(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                setError('Failed to fetch tasks');
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!tasks || tasks.length === 0) return <div>No tasks available</div>;

    return (
        <div className={styles.taskList || 'taskList'}>
            <h2>Tasks</h2>
            {tasks.map(task => (
                <div key={task.id} className={styles.taskCard || 'taskCard'}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className={styles.taskMeta || 'taskMeta'}>
                        <span>Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</span>
                        <span>Status: {task.completed ? 'Completed' : 'Pending'}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};