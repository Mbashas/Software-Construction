# Django Migration Best Practices

## Tips for Managing Migrations Effectively

### 1. Regular Maintenance

- **Make small, focused migrations** - Each migration should make a specific change to your models
- **Run migrations early and often** - Don't let migrations pile up in development
- **Commit migrations with their corresponding model changes** - Keeps version control history clean

### 2. Avoiding Conflicts

- **Coordinate with team members** when changing the same app
- **Pull and migrate before making model changes** to avoid parallel migration paths
- **Use descriptive names for migrations** like `0003_add_user_profile_fields.py` instead of auto-generated names

### 3. Testing Migrations

- **Test migrations on a copy of production data** before deploying
- **Have a rollback plan** for each migration
- **Use Django's `--plan` flag** to see what migrations will run: `python manage.py migrate --plan`

### 4. Fixing Common Problems

#### Conflict Resolution

When you see "Conflicting migrations detected":

```
python manage.py makemigrations --merge
```

#### Database/Migration State Mismatch

If your database state doesn't match migration history:

```
# Find the most recent working migration
python manage.py migrate app_name 0001 --fake

# Then apply remaining migrations normally
python manage.py migrate app_name
```

#### Complete Reset (Development Only)

For development environments when migrations are completely broken:

```
# 1. Backup your data
python manage.py dumpdata > data_backup.json

# 2. Clean migrations
find app_name/migrations -name "*.py" | grep -v "__init__.py" | xargs rm

# 3. Create fresh migration
python manage.py makemigrations app_name

# 4. Fake initial migration
python manage.py migrate app_name --fake-initial

# 5. Restore data if needed
python manage.py loaddata data_backup.json
```

### 5. Working with Squashed Migrations

When migration history gets too long:

```
python manage.py squashmigrations app_name 0001 0010
```

## For Your Current Project

Now that your migrations are working:

1. **Keep a backup of your database** periodically
2. **Review migrations before applying** them with `python manage.py showmigrations`
3. **Consider using migration names** with `python manage.py makemigrations app_name --name descriptive_name`

Happy coding!
