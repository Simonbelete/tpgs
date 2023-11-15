from model_bakery.recipe import Recipe
from faker import Faker

from . import models

fake = Faker()

nutrient_group = Recipe(
    models.NutrientGroup,
)

nutrient = Recipe(
    models.Nutrient,
)
