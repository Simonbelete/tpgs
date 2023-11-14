from model_bakery.recipe import Recipe
from faker import Faker

from . import models

fake = Faker()

house = Recipe(
    models.House,
)
