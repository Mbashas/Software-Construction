"""
Database Reset Script

This script completely resets the database and recreates it from scratch,
creating a superuser and necessary migrations.

WARNING: This will delete all data in your database!
"""

import os
import shutil
import subprocess
import sys
from pathlib import Path

def run_command(command):
    """Execute a command and display its output"""
    print(f"\nRunning: {command}")
    try:
        # Real-time output
        process = subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        
        # Print output in real-time
        for line in iter(process.stdout.readline, ""):
            print(line, end="")
        
        process.stdout.close()
        return_code = process.wait()
        
        if return_code != 0:
            print(f"Command failed with return code {return_code}")
            return False
        return True
    except Exception as e:
        print(f"Error executing command: {e}")
        return False

def delete_database():
    """Delete the SQLite database file"""
    db_path = Path("db.sqlite3")
    if db_path.exists():
        print(f"Deleting database file: {db_path}")
        db_path.unlink()
        return True
    else:
        print("Database file does not exist. Skipping deletion.")
        return True

def clean_migrations():
    """Clean up migration files for all apps"""
    apps = ["tasks", "users"]  # Add all your apps here
    
    for app in apps:
        migrations_dir = Path(app) / "migrations"
        if not migrations_dir.exists():
            print(f"Migrations directory for {app} does not exist. Skipping.")
            continue
            
        print(f"Cleaning migrations for {app}...")
        
        # Keep __init__.py
        for file_path in migrations_dir.glob("*.py"):
            if file_path.name != "__init__.py":
                print(f"  Removing: {file_path.name}")
                file_path.unlink()
    
    return True

def create_migrations():
    """Create fresh migrations for all apps"""
    print("Creating migrations...")
    return run_command("python manage.py makemigrations")

def apply_migrations():
    """Apply all migrations"""
    print("Applying migrations...")
    return run_command("python manage.py migrate")

def create_superuser():
    """Create a superuser for the admin interface"""
    print("\nCreating superuser...")
    
    # Environment variables for non-interactive superuser creation
    os.environ['DJANGO_SUPERUSER_USERNAME'] = 'admin'
    os.environ['DJANGO_SUPERUSER_PASSWORD'] = 'admin'
    os.environ['DJANGO_SUPERUSER_EMAIL'] = 'admin@example.com'
    
    return run_command("python manage.py createsuperuser --noinput")

def main():
    print("===== Database Reset Script =====")
    print("WARNING: This will completely reset your database and DELETE ALL DATA!")
    
    response = input("Are you sure you want to proceed? Type 'yes' to confirm: ")
    if response.lower() != 'yes':
        print("Operation cancelled.")
        return
    
    steps = [
        ("Delete database", delete_database),
        ("Clean migrations", clean_migrations),
        ("Create new migrations", create_migrations),
        ("Apply migrations", apply_migrations),
        ("Create superuser", create_superuser),
    ]
    
    for step_name, step_func in steps:
        print(f"\n----- {step_name} -----")
        if not step_func():
            print(f"Failed at step: {step_name}")
            print("Database reset incomplete. Please fix the issues and try again.")
            return
    
    print("\n===== Database reset completed successfully! =====")
    print("You can now start your Django server with:")
    print("python manage.py runserver")
    print("\nSuperuser credentials:")
    print("Username: admin")
    print("Password: admin")

if __name__ == "__main__":
    main()
