from typing import Iterable, Optional
from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel

class Purpose(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
