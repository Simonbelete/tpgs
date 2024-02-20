from django.db import models
from simple_history.models import HistoricalRecords
from django.core.validators import MinValueValidator

from core.models import CoreModel


class Stage(CoreModel):
    name = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0, unique=True)
    min_week = models.IntegerField(null=True, blank=True)
    max_week = models.IntegerField(null=True, blank=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    @property
    def display_name(self):
        return self.name

    class Meta:
        ordering = ('order',)
