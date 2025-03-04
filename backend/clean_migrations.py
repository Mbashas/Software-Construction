"""
Migration Cleanup Script

This script completely resets the migration state for specified apps and creates fresh migrations.
Use with caution - it will delete all existing migrations!
"""

import os
import shutil
import subprocess
import sys
from pathlib import Path

# Apps to clean up - add more if needed
APPS_TO_CLEAN = ['tasks']

# Directory containing Django project
PROJECT_DIR = Path.cwd()

def run_command(command, capture_output=True):
    """Execute a shell command and return its output"""
    print(f"$ {command}")
    
    try:
        if capture_output:
            result = subprocess.run(
                command,
                shell=True,
                capture_output=True,
                text=True,
                check=True
            )
            return result.stdout.strip()
        else:
            # Just run the command without capturing output
            subprocess.run(command, shell=True, check=True)
            return None
    except subprocess.CalledProcessError as e:
        print(f"Command failed with exit code {e.returncode}")
        print(f"Error output: {e.stderr}")
        return None

def backup_database():
    """Create a backup of the database"""
    print("\n=== Creating database backup ===")
    backup_file = PROJECT_DIR / "db_backup_before_migration_clean.json"
    
    try:
        run_command(f"python manage.py dumpdata --indent=2 --exclude=contenttypes --exclude=auth.permission > {backup_file}", 
                  capture_output=False)
        print(f"Database backup created at: {backup_file}")
        return True
    except Exception as e:
        print(f"Failed to backup database: {e}")
        return False

def clean_migrations(app):
    """Remove migration files for a specific app"""
    print(f"\n=== Cleaning migrations for {app} ===")
    
    migrations_dir = PROJECT_DIR / app / "migrations"
    
    if not migrations_dir.exists():
        print(f"Migrations directory not found: {migrations_dir}")
        return False
    
    # Create backup of migrations directory
    backup_dir = PROJECT_DIR / f"{app}_migrations_backup"
    if backup_dir.exists():
        shutil.rmtree(backup_dir)
    shutil.copytree(migrations_dir, backup_dir)
    print(f"Migrations backed up to: {backup_dir}")
    
    # Delete all migration files except __init__.py
    for file in migrations_dir.glob("*.py"):
        if file.name != "__init__.py":
            print(f"Removing: {file.name}")
            file.unlink()
    
    return True

def fake_zero_migrations(app):
    """Reset migrations for an app to zero"""
    print(f"\n=== Resetting migration state for {app} ===")
    
    try:
        run_command(f"python manage.py migrate {app} zero --fake", capture_output=False)
        print(f"Migration state for {app} has been reset")
        return True
    except Exception as e:
        print(f"Failed to reset migration state: {e}")
        return False

def create_fresh_migrations(app):
    """Create new initial migration for an app"""
    print(f"\n=== Creating fresh migrations for {app} ===")
    
    try:
        run_command(f"python manage.py makemigrations {app}", capture_output=False)
        print(f"New migration created for {app}")
        return True
    except Exception as e:
        print(f"Failed to create migration: {e}")
        return False

def apply_migrations(app=None):
    """Apply migrations, optionally for a specific app"""
    print(f"\n=== Applying migrations{f' for {app}' if app else ''} ===")
    
    command = f"python manage.py migrate {app}" if app else "python manage.py migrate"
    
    try:
        run_command(command + " --fake-initial", capture_output=False)
        print("Migrations applied successfully")
        return True
    except Exception as e:
        print(f"Failed to apply migrations: {e}")
        return False

def check_database_tables(app):
    """Check if app tables exist in the database"""
    print(f"\n=== Checking database tables for {app} ===")
    
    try:
        output = run_command(f"python manage.py inspectdb {app}")
        if output and app.lower() in output.lower():
            print(f"Found existing tables for {app} in database")
            return True
        else:
            print(f"No existing tables found for {app}")
            return False
    except Exception as e:
        print(f"Error checking database tables: {e}")
        return False

def main():
    print("===== Django Migration Cleanup Script =====")
    print("WARNING: This will reset all migrations for specified apps!")
    
    # Ask for confirmation
    response = input("Do you want to proceed? This cannot be undone. (yes/no): ")
    if response.lower() != "yes":
        print("Operation cancelled.")
        return
    
    # Create database backup
    if not backup_database():
        print("Failed to create database backup. Aborting.")
        return
    
    # Process each app
    for app in APPS_TO_CLEAN:
        # Check if app tables exist in the database
        tables_exist = check_database_tables(app)
        
        # Clean migrations
        if not clean_migrations(app):
            print(f"Failed to clean migrations for {app}. Skipping.")
            continue
        
        # If tables exist, fake-zero the migrations
        if tables_exist:
            if not fake_zero_migrations(app):
                print(f"Failed to reset migration state for {app}. Proceeding anyway.")
        
        # Create fresh migrations
        if not create_fresh_migrations(app):
            print(f"Failed to create fresh migrations for {app}. Skipping.")
            continue
        
        # Apply migrations with --fake-initial if tables exist
        if tables_exist:
            if not apply_migrations(app):
                print(f"Failed to apply migrations for {app}.")
    
    print("\n===== Migration cleanup completed =====")
    print("Restart your Django server to apply changes.")

if __name__ == "__main__":
    main()
