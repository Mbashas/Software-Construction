import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios'; // Uncomment to use real API calls

// Task Context
const TaskContext = createContext();

// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',     // 'all', 'completed', 'pending'
    priority: 'all',   // 'all', 'high', 'medium', 'low'
    search: ''
  },
  sorting: {
    field: 'due_date', // 'title', 'due_date', 'priority', 'created_at'
    direction: 'asc'   // 'asc', 'desc'
  },
  users: [], // To store available users
  usersLoading: false,
  usersError: null
};

// Action types
const actions = {
  FETCH_TASKS_START: 'FETCH_TASKS_START',
  FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_ERROR: 'FETCH_TASKS_ERROR',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  FETCH_USERS_START: 'FETCH_USERS_START',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR: 'FETCH_USERS_ERROR'
};

// Reducer function
function taskReducer(state, action) {
  switch (action.type) {
    case actions.FETCH_TASKS_START:
      return { ...state, loading: true, error: null };
    
    case actions.FETCH_TASKS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        tasks: action.payload,
        error: null 
      };
    
    case actions.FETCH_TASKS_ERROR:
      return { ...state, loading: false, error: action.payload };
    
    case actions.ADD_TASK:
      return { 
        ...state, 
        tasks: [...state.tasks, action.payload],
      };
    
    case actions.UPDATE_TASK: {
      const updatedTasks = state.tasks.map(task => 
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      return { ...state, tasks: updatedTasks };
    }
    
    case actions.DELETE_TASK:
      return { 
        ...state, 
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case actions.SET_FILTER:
      return { 
        ...state, 
        filters: { ...state.filters, [action.payload.key]: action.payload.value } 
      };
    
    case actions.SET_SORT:
      return { 
        ...state, 
        sorting: { 
          field: action.payload.field, 
          direction: action.payload.field === state.sorting.field && 
                     state.sorting.direction === 'asc' ? 'desc' : 'asc' 
        } 
      };

    case actions.FETCH_USERS_START:
      return { ...state, usersLoading: true, usersError: null };
      
    case actions.FETCH_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        users: action.payload,
        usersError: null
      };
      
    case actions.FETCH_USERS_ERROR:
      return {
        ...state,
        usersLoading: false,
        usersError: action.payload
      };
    
    default:
      return state;
  }
}

// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// Provider component
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  
  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
    fetchUsers(); // Also fetch available users
  }, []);
  
  // API Functions
  
  // Fetch all tasks
  async function fetchTasks() {
    dispatch({ type: actions.FETCH_TASKS_START });
    try {
      // Use real API instead of mock data
      const token = localStorage.getItem('token');
      
      // Make actual API call
      const response = await axios.get(`${API_URL}/tasks/`, {
        headers: { Authorization: `Token ${token}` }
      });
      
      dispatch({ type: actions.FETCH_TASKS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      
      // If API call fails, use mock data as fallback for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data as fallback in development');
        const mockData = [
          {
            id: 1,
            title: 'Translate Papyrus of Ani',
            description: 'Translate the ancient Egyptian Book of the Dead papyrus found in the latest excavation.',
            status: false,
            priority: 'high',
            created_at: '2023-02-15T09:00:00Z',
            due_date: '2023-03-01T17:00:00Z',
            assigned_to: 'admin' // Match with an actual user
          },
          {
            id: 2,
            title: 'Organize Symposium',
            description: 'Plan the philosophical symposium in the Great Library of Alexandria.',
            status: true,
            priority: 'medium',
            created_at: '2023-02-10T11:30:00Z',
            due_date: '2023-02-20T18:00:00Z',
            assigned_to: 'Hypatia'
          },
          {
            id: 3,
            title: 'Map the Stars',
            description: 'Update celestial charts based on latest observations for the Temple of Hathor.',
            status: false,
            priority: 'low',
            created_at: '2023-01-25T14:15:00Z',
            due_date: '2023-03-15T23:59:00Z',
            assigned_to: 'Eratosthenes'
          },
          {
            id: 4,
            title: 'Prepare Offerings for Festival of Thoth',
            description: 'Acquire papyrus, ibis feathers, and ink for the upcoming festival of Thoth, god of wisdom.',
            status: false,
            priority: 'high',
            created_at: '2023-02-01T08:45:00Z',
            due_date: '2023-02-28T16:00:00Z',
            assigned_to: 'Nefertari'
          },
          {
            id: 5,
            title: 'Debate on Socratic Method',
            description: 'Prepare arguments for the dialectical debate on knowledge and virtue.',
            status: true,
            priority: 'medium',
            created_at: '2023-01-30T13:20:00Z',
            due_date: '2023-02-10T15:30:00Z',
            assigned_to: 'Aristotle'
          }
        ];
        
        dispatch({ type: actions.FETCH_TASKS_SUCCESS, payload: mockData });
      } else {
        dispatch({ 
          type: actions.FETCH_TASKS_ERROR, 
          payload: 'Failed to fetch tasks. Please try again.' 
        });
      }
    }
  }
  
  // Fetch all users
  async function fetchUsers() {
    dispatch({ type: actions.FETCH_USERS_START });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/`, {
        headers: { Authorization: `Token ${token}` }
      });
      
      dispatch({ type: actions.FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
      dispatch({ 
        type: actions.FETCH_USERS_ERROR, 
        payload: 'Failed to fetch users list.' 
      });
      
      // Fallback for development
      if (process.env.NODE_ENV === 'development') {
        const mockUsers = [
          { id: 1, username: 'admin', email: 'admin@example.com' },
          { id: 2, username: 'Imhotep', email: 'imhotep@ancient.com' },
          { id: 3, username: 'Hypatia', email: 'hypatia@alexandria.edu' },
        ];
        dispatch({ type: actions.FETCH_USERS_SUCCESS, payload: mockUsers });
      }
    }
  }
  
  // Add a new task
  async function addTask(task) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/tasks/`, task, {
        headers: { 
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      dispatch({ type: actions.ADD_TASK, payload: response.data });
      return response.data;
    } catch (error) {
      console.error('Failed to add task:', error);
      throw new Error('Failed to add task. Please try again.');
    }
  }
  
  // Update an existing task
  async function updateTask(id, taskData) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${API_URL}/tasks/${id}/`, taskData, {
        headers: { 
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      dispatch({ type: actions.UPDATE_TASK, payload: response.data });
      return response.data;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw new Error('Failed to update task. Please try again.');
    }
  }
  
  // Delete a task
  async function deleteTask(id) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/tasks/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      
      dispatch({ type: actions.DELETE_TASK, payload: id });
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw new Error('Failed to delete task. Please try again.');
    }
  }
  
  // Filter and sort tasks
  const filteredSortedTasks = React.useMemo(() => {
    let result = [...state.tasks];
    
    // Apply filters
    if (state.filters.status !== 'all') {
      const statusBool = state.filters.status === 'completed';
      result = result.filter(task => task.status === statusBool);
    }
    
    if (state.filters.priority !== 'all') {
      result = result.filter(task => task.priority === state.filters.priority);
    }
    
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm) || 
        (task.description && task.description.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue = a[state.sorting.field];
      let bValue = b[state.sorting.field];
      
      // Handle date fields
      if (['due_date', 'created_at'].includes(state.sorting.field)) {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }
      
      if (aValue < bValue) {
        return state.sorting.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return state.sorting.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return result;
  }, [state.tasks, state.filters, state.sorting]);
  
  // Set filter
  const setFilter = (key, value) => {
    dispatch({ type: actions.SET_FILTER, payload: { key, value } });
  };
  
  // Set sort
  const setSort = (field) => {
    dispatch({ type: actions.SET_SORT, payload: { field } });
  };

  const value = {
    ...state,
    filteredSortedTasks,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    setSort,
    // Add users to the context value
    users: state.users,
    usersLoading: state.usersLoading,
    usersError: state.usersError
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Custom hook to use the task context
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
