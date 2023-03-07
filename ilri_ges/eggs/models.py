from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class Egg(CoreModel):
    week = models.IntegerField(default=0)
    eggs = models.IntegerField()
    total_weight = models.DecimalField(
        max_digits=10, decimal_places=3, default=0)
    chicken = models.ForeignKey(
        'chickens.Chicken', on_delete=models.CASCADE, related_name='eggs')

    history = HistoricalRecords()
