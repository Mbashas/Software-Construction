# Prism Nexus / Agora Hub

A full-stack task management application built with Django REST Framework and React.

![Agora Hub](/screenshots/agora-hub-dashboard.png)

## Overview

Prism Nexus (backend code name) / Agora Hub (frontend theme name) is a modern task management system that allows users to:

- Create, view, update, and delete tasks
- Assign tasks to users
- Filter and sort tasks by various criteria
- Track task status and progress
- Manage users and permissions

The project features a Django backend with a REST API and a React frontend with a clean, modern UI.

## Tech Stack

### Backend
- Django 5.1.6
- Django REST Framework
- SQLite database
- Token-based authentication

### Frontend
- React
- Modern JavaScript (ES6+)
- Custom CSS
- React Context API
- React Router

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The application will be available at http://localhost:3000

## Features

### User Authentication
- Token-based authentication
- User registration and login
- Protected routes and API endpoints

### Task Management
- Create new tasks with title, description, priority and due date
- Assign tasks to users
- Mark tasks as complete
- Edit and delete tasks
- Filter tasks by status, priority, and search term
- Sort tasks by various fields

### User Interface
- Clean, modern design with an ancient Greek/Egyptian theme
- Responsive layout for various device sizes
- Intuitive navigation and interactions

## Project Structure

### Backend
```
backend/
├── backend/             # Django project settings
├── tasks/               # Tasks app
│   ├── migrations/
│   ├── models.py        # Task data models
│   ├── serializers.py   # REST serializers
│   ├── views.py         # API views
│   └── urls.py          # App URLs
├── users/               # Users app
│   ├── migrations/
│   ├── models.py        # Custom user model
│   ├── serializers.py   # User serializers
│   ├── views.py         # User API views
│   └── urls.py          # User URLs
└── manage.py            # Django management script
```

### Frontend
```
frontend/
├── public/              # Public assets
├── src/
│   ├── components/      # React components
│   │   ├── Login/       # Authentication components
│   │   ├── TaskList/    # Task list components
│   │   ├── Tasks/       # Task-related components
│   │   └── UserGallery/ # User display components
│   ├── context/         # React context providers
│   ├── services/        # API service modules
│   ├── utils/           # Utility functions and scripts
│   ├── App.js           # Main application component
│   └── index.js         # Application entry point
└── package.json         # Node dependencies
```

## API Endpoints

| Endpoint          | Method | Description                      | Authentication |
|-------------------|--------|----------------------------------|----------------|
| /users/login/     | POST   | Authenticates a user             | No             |
| /users/register/  | POST   | Registers a new user             | No             |
| /users/me/        | GET    | Gets current user details        | Yes            |
| /users/           | GET    | Lists all users                  | Yes            |
| /tasks/           | GET    | Lists tasks for current user     | Yes            |
| /tasks/           | POST   | Creates a new task               | Yes            |
| /tasks/{id}/      | GET    | Gets details for a specific task | Yes            |
| /tasks/{id}/      | PATCH  | Updates a specific task          | Yes            |
| /tasks/{id}/      | DELETE | Deletes a specific task          | Yes            |

## Troubleshooting

### Migration Issues
If you encounter Django migration issues, use the provided utility scripts:
```bash
python fix_migrations.bat  # On Windows
./fix_migrations.sh        # On Unix-based systems
```

### Database Schema Issues
To inspect and fix database schema issues:
```bash
python inspect_db.py
python fix_task_model.py
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Django REST Framework documentation and community
- React documentation and community
- All contributors to this project
