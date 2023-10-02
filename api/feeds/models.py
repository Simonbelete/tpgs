from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from flocks.models import Flock
from units.models import Unit
from chickens.models import Chicken
from formulas.models import Formula

class Feed(CoreModel):
    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, null=True, blank=True, related_name='feeds')
    chicken = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, null=True, blank=True, related_name='feeds')
    formula = models.ForeignKey(
        Formula, on_delete=models.SET_NULL, null=True, blank=True, related_name='feeds')
    week = models.IntegerField(default=0)
    weight = models.FloatField(null=True, blank=True)
    weight_unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, blank=True, related_name='feeds')
    history = HistoricalRecords()

    class Meta:
        unique_together = ['flock', 'chicken', 'week']
