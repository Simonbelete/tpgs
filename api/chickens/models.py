from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from units.models import Unit


class Chicken(CoreModel):
    SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )

    tag = models.CharField(max_length=250, unique=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES,
                           null=True, blank=True, default=None)
    history = HistoricalRecords()

    def __str__(self):
        return self.tag
