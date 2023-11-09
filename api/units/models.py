from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class Unit(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def display_name(self):
        return self.name


class UnitConverter(CoreModel):
    unit_from = models.ForeignKey(
        Unit, on_delete=models.CASCADE, related_name='unit_from')
    unit_to = models.ForeignKey(
        Unit, on_delete=models.CASCADE, related_name='unit_to')
    factor = models.FloatField(default=1)
    history = HistoricalRecords()

    class Meta:
        unique_together = ['unit_from', 'unit_to']
