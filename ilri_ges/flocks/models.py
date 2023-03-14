from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from breeds.models import BreedType
from farms.models import Farm


class Flock(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    hatch_date = models.DateField()
    breed_type = models.ForeignKey(
        BreedType, on_delete=models.SET_NULL, null=True, related_name='flocks')
    farm = models.ForeignKey(
        Farm, on_delete=models.SET_NULL, null=True, related_name='flock')

    history = HistoricalRecords()

    def __str__(self):
        return self.name
