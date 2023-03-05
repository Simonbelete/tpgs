from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class Weight(CoreModel):
    week = models.IntegerField(default=0)
    weight = models.DecimalField(
        max_digits=10, decimal_places=3, default=0)
    chicken = models.ForeignKey(
        'chickens.Chicken', on_delete=models.CASCADE, related_name='weights')

    history = HistoricalRecords()

    def __str__(self):
        return self.week
