import os 
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")

import django 
django.setup() 

from faker import factory,Faker 
from itertools import islice, cycle
from model_bakery import baker

from nutrients.models import *
from units.models import *

fake = Faker()

randomNames = set(fake.words(nb=200)) 

units = baker.make(Unit, name=cycle(randomNames), _quantity=100)

nutrients = baker.make(Nutrient,
                       name=cycle(randomNames),
                       unit=cycle(units), _quantity=100)
