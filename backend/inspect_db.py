"""
Script to inspect the database table structure
This helps identify discrepancies between models and actual database schema
"""

import sqlite3
import os

def inspect_sqlite_table(db_path, table_name):
    """
    Print the schema of a SQLite table
    """
    conn = None
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get table info
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = cursor.fetchall()
        
        if not columns:
            print(f"Table '{table_name}' does not exist in the database.")
            return
        
        print(f"\nTable: {table_name}")
        print("-" * 70)
        print(f"{'Column Name':<20} {'Type':<10} {'Not Null':<10} {'Default':<15} {'Primary Key'}")
        print("-" * 70)
        
        for col in columns:
            col_id, name, type_, not_null, default_val, is_pk = col
            print(f"{name:<20} {type_:<10} {bool(not_null):<10} {str(default_val):<15} {bool(is_pk)}")
            
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
    finally:
        if conn:
            conn.close()

def main():
    db_path = 'db.sqlite3'  # Adjust if your DB file is elsewhere
    
    if not os.path.exists(db_path):
        print(f"Database file {db_path} not found!")
        return
    
    # Inspect the tasks_task table
    inspect_sqlite_table(db_path, 'tasks_task')
    
    print("\nTo fix the schema mismatch:")
    print("1. Make sure your Task model has all the fields in the database")
    print("2. Run 'python manage.py makemigrations' to create a migration")
    print("3. Run 'python manage.py migrate' to apply the migration")
    print("4. Restart your Django server")

if __name__ == "__main__":
    main()
