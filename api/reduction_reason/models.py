from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class ReductionReason(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    
    @property
    def display_name(self):
        return self.name
