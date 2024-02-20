from django.db import models
from simple_history.models import HistoricalRecords
from django.core.validators import MinValueValidator

from core.models import CoreModel


class Stage(CoreModel):
    name = models.CharField(max_length=250)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0, unique=True)
    min_week = models.IntegerField()
    max_week = models.IntegerField()
    history = HistoricalRecords()

    def __str__(self):
        return self.name
