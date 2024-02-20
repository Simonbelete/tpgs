from django.db import models
from core.models import CoreModel
from simple_history.models import HistoricalRecords

from chickens.models import Chicken
from stages.models import Stage
from hatchery.models import Hatchery


class Selection(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.SET_NULL, null=True, blank=True, related_name='selection')
    # Stage Moved to
    stage = models.ForeignKey(
        Stage, on_delete=models.SET_NULL, null=True, blank=True, related_name='selection')
    # Stages Movement Moved from
    from_stage = models.ForeignKey(
        Stage, on_delete=models.SET_NULL, null=True, blank=True, related_name='selection')
    selected_chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='selection')
    culled_chickens = selected_chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='selection')

    history = HistoricalRecords()
