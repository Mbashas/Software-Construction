@echo off
echo ===== Django Migration Fix Script =====
echo This script will attempt to fix your migration issues by:
echo 1. Backing up your database
echo 2. Removing conflicting migrations
echo 3. Creating fresh migrations
echo 4. Applying them with --fake-initial

echo.
echo WARNING: Make sure your Django server is not running!
echo.
pause

echo.
echo Creating database backup...
python manage.py dumpdata --exclude auth.permission --exclude contenttypes > db_backup.json
if %errorlevel% neq 0 (
    echo Failed to create backup! Proceeding anyway, but be careful.
)

echo.
echo Cleaning tasks migrations...
cd tasks\migrations
del /Q 0*.py
cd ..\..

echo.
echo Creating fresh migrations...
python manage.py makemigrations tasks
if %errorlevel% neq 0 (
    echo Failed to create migrations. Please check the error messages.
    pause
    exit /b 1
)

echo.
echo Applying migrations with fake-initial...
python manage.py migrate tasks --fake-initial
if %errorlevel% neq 0 (
    echo Failed to apply migrations. Please check the error messages.
    pause
    exit /b 1
)

echo.
echo Checking overall migration status...
python manage.py showmigrations tasks

echo.
echo Migration fix complete! Try running your server now.
echo If problems persist, consider using the reset_db.py script (will delete all data).
echo.
pause
