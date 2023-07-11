from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class Breed(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    color = models.CharField(max_length=10, null=True, blank=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name
