// src/components/UserList/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserList.module.css';

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!users || users.length === 0) return <div>No users available</div>;

    // Calculate pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className={styles.userList || 'userList'}>
            <h2>Users</h2>
            {currentUsers.map(user => (
                <div key={user.id} className={styles.userCard || 'userCard'}>
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                </div>
            ))}
            
            {users.length > usersPerPage && (
                <div className={styles.pagination || 'pagination'}>
                    <button 
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {Math.ceil(users.length / usersPerPage)}</span>
                    <button 
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(users.length / usersPerPage)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

