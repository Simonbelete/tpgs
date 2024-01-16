from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from chickens.models import Chicken


class Weight(CoreModel):
    chicken = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, null=True, blank=True, related_name='weights')
    week = models.IntegerField(default=0)
    weight = models.DecimalField(
        max_digits=7, decimal_places=3, default=0)  # g
    history = HistoricalRecords()

    class Meta:
        unique_together = ['chicken', 'week']
