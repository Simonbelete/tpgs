from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class Flock(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    hatch_date = models.DateField()
    no_chickens = models.IntegerField(default=0)
    history = HistoricalRecords()

    def __str__(self):
        return self.name
