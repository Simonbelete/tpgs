from django.db import models
from djmoney.models.fields import MoneyField
from multiselectfield import MultiSelectField

from core.models import CoreModel

class Ingredient(CoreModel):
    NUTRIENT_CHOICES = [
        ('ME', 'Energy'),
        ('P', 'Protein'),
        ('FA', 'Fat'),
        ('AD', 'Additive'),
        ('FI', 'Fiber'),
        ('MI', 'Mineral')
    ]

    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=200)
    balance = MoneyField(max_digits=14, decimal_places=2, default_currency='ETB')
    nutrient_sources = MultiSelectField(choices=NUTRIENT_CHOICES)

