from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from units.models import Unit


class House(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
