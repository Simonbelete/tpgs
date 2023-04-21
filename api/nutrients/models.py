from django.db import models
from units.models import Unit


class NutrientGroup(models.Model):
    name = models.CharField(max_length=100, unique=True)


class Nutrient(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=100, unique=True)
    nutrient_group = models.ForeignKey(
        NutrientGroup, on_delete=models.SET_NULL, null=True, related_name='nutrients')
    unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, related_name='nutrients')
