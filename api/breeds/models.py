from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from core.validators import WEEK_VALIDATOR, PERCENTAGE_VALIDATOR
from units.models import Unit


class Breed(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    color = models.CharField(max_length=10, null=True, blank=True)
    hdep_desirable_avg = models.PositiveIntegerField(
        validators=PERCENTAGE_VALIDATOR, null=True, blank=True)
    hhep_desirable_avg = models.PositiveIntegerField(
        validators=PERCENTAGE_VALIDATOR, null=True, blank=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name


class BreedHDEPGuide(CoreModel):
    """Hen-Day Egg Production (HDEP)
    """
    breed = models.ForeignKey(
        Breed, on_delete=models.CASCADE)
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR)
    hdep = models.PositiveIntegerField(
        validators=PERCENTAGE_VALIDATOR, default=0)


class BreedHHEPGuide(CoreModel):
    """Hen-Housed Egg Production (HHEP)
    """
    breed = models.ForeignKey(
        Breed, on_delete=models.CASCADE)
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR)
    hhep = models.PositiveIntegerField(
        validators=PERCENTAGE_VALIDATOR, default=0)


class BreedWeightGuide(CoreModel):
    breed = models.ForeignKey(
        Breed, on_delete=models.CASCADE)
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR)
    weight = models.FloatField()
    weight_unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, blank=True)


class BreedEggGuide(CoreModel):
    pass
