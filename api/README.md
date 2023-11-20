## Inputs Decimal place
- For weights max 9999 with a decimal place of three
eg 9999.999
- For price 10 digits with 2 decimal place


## Setup

1. ```python manage.py migrate_schemas --shared```
2. ```python manage.py create_schema public```
<!-- 3. ```python manage.py loaddata */fixtures/*.json``` -->
3. ```python manage.py loaddata fixtures/*.json```
4. ```python manage.py create_groups```
5. ```python manage.py cities_light```


## Testing

- Migrate shared schema i.e ```public``` by running ```python manage.py migrate_schemas```
- Create a test database with ```python manage.py create_schema```
- Seed group with permission ```python manage.py create_groups```. make sure group pk starts from 1 
- Run test ```python manager.py test```


## Run Worker

```celery -A api worker -l INFO```

Start flower web monitor
```celery -A api  flower --port=5555 -l INFO```


## Creating New Tenant

```python manage.py create_schema [tenant_name]```

## Migrate

migrate all ```python manage.py migrate_schemas```

### Country details
Migrate city, country and regions to public schema
```python manage.py cities_light```

### Directory List

Update the tenant list run the below command to update the directory list

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


## Deploy

gunicorn myproject.wsgi
