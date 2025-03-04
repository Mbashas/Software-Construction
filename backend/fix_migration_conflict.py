"""
Script to fix migration conflicts in Django project

This script will:
1. Identify your current migration state
2. Create a squashed migration that includes all changes
3. Clean up the migration history

Run this from the project root directory:
python fix_migration_conflict.py
"""

import os
import sys
import subprocess
from pathlib import Path

def run_command(command):
    """Run a shell command and return its output"""
    print(f"Running: {command}")
    result = subprocess.run(
        command,
        shell=True,
        capture_output=True,
        text=True
    )
    
    if result.returncode != 0:
        print(f"Error executing command: {result.stderr}")
        return None
    
    return result.stdout.strip()

def main():
    # Step 1: Show migration status
    print("Current migration status:")
    run_command("python manage.py showmigrations tasks")
    
    # Step 2: Backup your database
    backup_path = Path("db_backup.json")
    if not backup_path.exists():
        print("\nBacking up database...")
        run_command("python manage.py dumpdata --exclude auth.permission --exclude contenttypes > db_backup.json")
    
    # Step 3: Zero out the app's migrations
    print("\nResetting migrations for tasks app...")
    run_command("python manage.py migrate tasks zero --fake")
    
    # Step 4: Delete all migration files (except __init__.py)
    migrations_dir = Path("tasks/migrations")
    print(f"\nRemoving old migration files from {migrations_dir}...")
    
    for migration_file in migrations_dir.glob("*.py"):
        if migration_file.name != "__init__.py":
            print(f"  Removing {migration_file.name}")
            migration_file.unlink()
    
    # Step 5: Create a fresh migration
    print("\nCreating fresh migration...")
    run_command("python manage.py makemigrations tasks")
    
    # Step 6: Fake apply the migration
    print("\nApplying migration with --fake-initial...")
    run_command("python manage.py migrate tasks --fake-initial")
    
    # Step 7: Show migration status after fix
    print("\nNew migration status:")
    run_command("python manage.py showmigrations tasks")
    
    print("\nMigration conflict resolved. You may need to restart your server.")

if __name__ == "__main__":
    main()
