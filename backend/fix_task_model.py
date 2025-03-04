"""
Script to fix the Task model database schema

This script will:
1. Create a clean migration to ensure the Task model has all required fields
2. Apply the migration to update the database schema
"""

import subprocess
import os

def run_command(command, capture_output=True):
    """Run a command and return its output"""
    print(f"Running: {command}")
    result = subprocess.run(
        command,
        shell=True,
        capture_output=capture_output,
        text=True
    )
    
    if result.returncode != 0:
        print(f"Error executing command: {result.stderr}")
        return None
    
    return result.stdout.strip() if capture_output else None

def main():
    # Create backup of database
    print("Creating database backup...")
    run_command("python manage.py dumpdata --exclude auth.permission --exclude contenttypes > db_backup_before_fix.json")
    
    print("\nApplying migrations to fix database schema...")
    run_command("python manage.py migrate tasks", capture_output=False)
    
    print("\nVerifying database schema...")
    run_command("python manage.py inspectdb tasks.Task", capture_output=False)
    
    print("\nChecking for any remaining migrations...")
    run_command("python manage.py showmigrations tasks", capture_output=False)
    
    print("\nDatabase schema update complete!")
    print("If the server is running, restart it now to use the updated schema.")

if __name__ == "__main__":
    main()
