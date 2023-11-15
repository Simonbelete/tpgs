from model_bakery.recipe import Recipe, foreign_key
from faker import Faker

from units.baker_recipes import unit
from . import models

fake = Faker()

nutrient_group = Recipe(
    models.NutrientGroup,
)

nutrient = Recipe(
    models.Nutrient,
    # abbreviation=fake.unique.pystr(9, 9),
    unit=foreign_key(unit)
)
