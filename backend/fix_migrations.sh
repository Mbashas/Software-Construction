#!/bin/bash

echo "===== Django Migration Fix Script ====="
echo "This script will attempt to fix your migration issues by:"
echo "1. Backing up your database"
echo "2. Removing conflicting migrations"
echo "3. Creating fresh migrations"
echo "4. Applying them with --fake-initial"

echo
echo "WARNING: Make sure your Django server is not running!"
echo
read -p "Press Enter to continue..."

echo
echo "Creating database backup..."
python manage.py dumpdata --exclude auth.permission --exclude contenttypes > db_backup.json
if [ $? -ne 0 ]; then
    echo "Failed to create backup! Proceeding anyway, but be careful."
fi

echo
echo "Cleaning tasks migrations..."
find tasks/migrations -name "0*.py" -delete

echo
echo "Creating fresh migrations..."
python manage.py makemigrations tasks
if [ $? -ne 0 ]; then
    echo "Failed to create migrations. Please check the error messages."
    read -p "Press Enter to exit..."
    exit 1
fi

echo
echo "Applying migrations with fake-initial..."
python manage.py migrate tasks --fake-initial
if [ $? -ne 0 ]; then
    echo "Failed to apply migrations. Please check the error messages."
    read -p "Press Enter to exit..."
    exit 1
fi

echo
echo "Checking overall migration status..."
python manage.py showmigrations tasks

echo
echo "Migration fix complete! Try running your server now."
echo "If problems persist, consider using the reset_db.py script (will delete all data)."
echo
read -p "Press Enter to exit..."
