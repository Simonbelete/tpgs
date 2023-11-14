from model_bakery.recipe import Recipe
from faker import Faker
from django.contrib.auth.models import Group

from . import models

fake = Faker()

superuser = Recipe(
    models.User,
    name="superuser",
    email="superuser@example.com",
    is_superuser=True,
)

farm_admin = Recipe(
    models.User,
    name="Farm Admin",
    email="farm-admin@example.com",
    is_superuser=False,
    groups=[Group.objects.get(pk=1)]
)

farmer = Recipe(
    models.User,
    name="Farmer",
    email="farmer@example.com",
    is_superuser=False,
    groups=[Group.objects.get(pk=2)]
)
