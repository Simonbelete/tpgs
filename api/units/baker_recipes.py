from model_bakery.recipe import Recipe, foreign_key
from faker import Faker

from . import models

fake = Faker()

unit = Recipe(
    models.Unit,
)
