from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class Egg(CoreModel):
    week = models.IntegerField(default=0)
    eggs = models.IntegerField()
    chicken = models.ForeignKey(
        'chickens.Chicken', on_delete=models.CASCADE, related_name='eggs')

    history = HistoricalRecords()
