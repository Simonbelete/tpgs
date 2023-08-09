## Setup

1. ```python manage.py migrate_schemas --shared```
2. ```python manage.py create_schema public```
3. ```python manage.py loaddata */fixtures/*.json```
4. ```python manage.py create_groups```

## Creating New Tenant

```python manage.py create_schema [tenant_name]```

## Migrate

migrate all ```python manage.py migrate_schemas```

## Create/Update View Table

```python manage.py migrate_schemas analyses directory_list_initial```

## Mass Data Collection

Prioritizes flock data if found
Sends notification to farm if duplicates found

taged and untaged

Menu
Feeding
    - Flock
    - Chicken

Flock
    - Reducation
    - Selection


Distribute

Feed Formulation
    - Experimental
        - Can change all values
        - Only Saves Requirements With the default ingredients

Farm / Flock / House / Pen

## Charts

- 