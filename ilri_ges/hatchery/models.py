from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from breeds.models import BreedType


class Hatchery(CoreModel):
    date = models.DateField()
    no_egg = models.IntegerField()
    breed_type = models.ForeignKey(
        BreedType, on_delete=models.SET_NULL, null=True, blank=True, related_name='hatchery')

    history = HistoricalRecords()


class Incubation(CoreModel):
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.CASCADE, related_name='hatchery')

    history = HistoricalRecords()


class Candling(CoreModel):
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.CASCADE, related_name='hatchery')

    history = HistoricalRecords()
