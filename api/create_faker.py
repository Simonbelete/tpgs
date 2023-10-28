import os 
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")

import django 
django.setup() 

from random import shuffle, randint
from faker import factory,Faker 
from itertools import islice, cycle
from model_bakery import baker
from model_bakery.recipe import Recipe, seq
from contextlib import suppress
from psycopg2.errors import UniqueViolation
from django.db import IntegrityError

from nutrients.models import *
from units.models import *
from requirements.models import *
from ingredients.models import *

fake = Faker()

# randomNames = set(fake.words(nb=200)) 
range100 = list(range(100))

def safe_execute(function, default, *args):
    try:
        return function(*args)
    except:
        return list(default)

print('=> Starting')

units = safe_execute(
    lambda: baker.make(Unit, name=seq('Unit-'), _quantity=100,  _bulk_create=True),
    Unit.objects.all()
)
print('=> Unit Done!')

ingredient_types = safe_execute(
    lambda: baker.make(IngredientType, name=seq('Ingredient Type-'), _quantity=100,  _bulk_create=True),
    IngredientType.objects.all()
)
print('=> Unit Done!')

nutrients = safe_execute(
    lambda: baker.make(
        Nutrient,
        name=seq('Nutrient-'),
        abbreviation=seq('N'),
        unit=cycle(units), 
        _quantity=100,
        _bulk_create=True
    ),
    Nutrient.objects.all()
)
print('=> Nutrient Done!')


requirements = safe_execute(
    lambda: baker.make(
        Requirement,
        name=seq('Requirement-'),
        _quantity=100
    ),
    Requirement.objects.all()
)
print('=> Requirement Done!')

for k in requirements:
    shuffle(nutrients)
    shuffle(range100)
    baker.make(
        RequirementNutrient,
        requirement=k,
        nutrient=cycle(nutrients),
        value=cycle(range100),
        _quantity=randint(1, 20)
    )
print('=> RequirementNutrient Done!')


ingredients = safe_execute(
    lambda: baker.make(
        Ingredient,
        name=seq('Ingredient-'),
        _quantity=100
    ),
    Ingredient.objects.all()
)
print('=> Ingredient Done!')

for k in ingredients:
    shuffle(nutrients)
    shuffle(range100)
    baker.make(
        IngredientNutrient,
        ingredient=k,
        nutrient=cycle(nutrients),
        value=cycle(range100),
        _quantity=randint(1, 20)
    )
print('=> IngredientNutrient Done!')

print('=> ALL DONE!')
