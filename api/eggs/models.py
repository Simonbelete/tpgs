from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from flocks.models import Flock
from units.models import Unit
from chickens.models import Chicken


class Egg(CoreModel):
    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, null=True, blank=True, related_name='eggs')
    chicken = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, null=True, blank=True, related_name='eggs')
    week = models.IntegerField(default=0)
    eggs = models.IntegerField()
    weight = models.FloatField()
    weight_unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, blank=True, related_name='eggs')

    class Meta:
        unique_together = ['flock', 'chicken', 'week']
