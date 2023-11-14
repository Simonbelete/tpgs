from model_bakery.recipe import Recipe
from faker import Faker

from . import models

fake = Faker()

superuser = Recipe(
    models.User,
    name=fake.name()
)

farm_admin = Recipe(
    models.User,
    name="Farm Admin",
    email="farm-admin@example.com"
)
