from django.db import models
from simple_history.models import HistoricalRecords
from django.core.validators import MinValueValidator

from core.models import CoreModel


class Stage(CoreModel):
    name = models.CharField(max_length=250)

    min_week = models.IntegerField()
    max_week = models.IntegerField()
    history = HistoricalRecords()

    def __str__(self):
        return self.name
