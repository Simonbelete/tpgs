import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()

from django_tenants.utils import schema_context
from chickens.models import *
import random
from hatchery.models import *
from breeds.models import *
from pen.models import *
from reduction_reason.models import *
from faker import Faker
from ingredients.models import *
from requirements.models import *
from units.models import *
from nutrients.models import *
from model_bakery.recipe import Recipe, seq, foreign_key
from model_bakery import baker
from itertools import islice, cycle
from random import shuffle, randint
from django_tenants.utils import get_tenant_model, get_tenant_domain_model



fake = Faker()

# randomNames = set(fake.words(nb=200))
range100 = list(range(100))
tenants = get_tenant_model().objects.all()

def randomize(data):
    def get_random_data():
        return random.choice(data)
    return get_random_data

def random_date():
    return fake.date()

def safe_execute(function, default, *args):
    try:
        return function(*args)
    except Exception as ex:
        print(ex)
        return list(default)


print('=> Starting')

# units = safe_execute(
#     lambda: baker.make(Unit, name=seq('Unit-'),
#                        _quantity=100,  _bulk_create=True),
#     Unit.objects.all()
# )
# print('=> Unit Done!')

# ingredient_types = safe_execute(
#     lambda: baker.make(IngredientType, name=seq(
#         'Ingredient Type-'), _quantity=100,  _bulk_create=True),
#     IngredientType.objects.all()
# )
# print('=> Unit Done!')

# nutrients = safe_execute(
#     lambda: baker.make(
#         Nutrient,
#         name=seq('Nutrient-'),
#         abbreviation=seq('N'),
#         unit=cycle(units),
#         _quantity=100,
#         _bulk_create=True
#     ),
#     Nutrient.objects.all()
# )
# print('=> Nutrient Done!')


# requirements = safe_execute(
#     lambda: baker.make(
#         Requirement,
#         name=seq('Requirement-'),
#         _quantity=100
#     ),
#     Requirement.objects.all()
# )
# print('=> Requirement Done!')

# for k in requirements:
#     shuffle(nutrients)
#     shuffle(range100)
#     baker.make(
#         RequirementNutrient,
#         requirement=k,
#         nutrient=cycle(nutrients),
#         value=cycle(range100),
#         _quantity=randint(1, 20)
#     )
# print('=> RequirementNutrient Done!')


# ingredients = safe_execute(
#     lambda: baker.make(
#         Ingredient,
#         name=seq('Ingredient-'),
#         _quantity=100
#     ),
#     Ingredient.objects.all()
# )
# print('=> Ingredient Done!')

# for k in ingredients:
#     shuffle(nutrients)
#     shuffle(range100)
#     baker.make(
#         IngredientNutrient,
#         ingredient=k,
#         nutrient=cycle(nutrients),
#         value=cycle(range100),
#         _quantity=randint(1, 20)
#     )
# print('=> IngredientNutrient Done!')

for tenant in ['test']:
    with schema_context(tenant):
        breeds = safe_execute(
            lambda: baker.make(
                Breed,
                name=seq('Breed-'),
                _quantity=100
            ),
            Breed.objects.all()
        )
        print('=> Breed Done!')

        hatchery = safe_execute(
            lambda: baker.make(
                Hatchery,
                name=seq('Hatchery-'),
                breed=randomize(breeds),
                hatch_date=fake.date(),
                _quantity=100
            ),
            Hatchery.objects.all()
        )
        print('=> Hatchery Done!')

        house = safe_execute(
            lambda: baker.make(
                House,
                name=seq('House-'),
                _quantity=100
            ),
            House.objects.all()
        )
        print('=> House Done!')

        pen = safe_execute(
            lambda: baker.make(
                Pen,
                name=seq('Pen-'),
                house=randomize(house),
                _quantity=100
            ),
            Pen.objects.all()
        )
        print('=> Pen Done!')

        chickens = safe_execute(
            lambda: baker.make(
                Chicken,
                tag=seq('{t} Tag-'.format(t=tenant[0])),
                sex=randomize(['M', 'F']),
                hatch_date=random_date,
                hatchery=randomize(hatchery),
                pen=randomize(pen),
                _quantity=100,
                _bulk_create=True
            ),
            Chicken.objects.all()
        )

        print('=> Chicken Done!')

        reduction_reason = safe_execute(
            lambda: baker.make(
                ReductionReason,
                name=seq('Reduction Reason-'),
                _quantity=100
            ),
            ReductionReason.objects.all()
        )
        print('=> ReductionReason Done!')

        chickens_dead = safe_execute(
            lambda: baker.make(
                Chicken,
                tag=seq('{t} TagD-'.format(t=tenant[0])),
                sex=randomize(['M', 'F']),
                hatch_date=random_date,
                hatchery=randomize(hatchery),
                pen=randomize(pen),
                reduction_date=random_date,
                reduction_reason=randomize(reduction_reason),
                _quantity=50,
                _bulk_create=True
            ),
            Chicken.objects.all()
        )

        print('=> Chicken Done!')

    print('=> {tenant} Done!'.format(tenant=tenant))


print('=> ALL DONE!')
