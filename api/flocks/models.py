from typing import Iterable, Optional
from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from accusation.models import Accusation
from chickens.models import Chicken


class Flock(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    hatch_date = models.DateField()
    no_chickens = models.IntegerField(default=0)
    accusation = models.ForeignKey(
        Accusation, on_delete=models.SET_NULL, null=True, blank=True, related_name='flocks')
    accusation_date = models.DateField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name


class FlockReduction(CoreModel):
    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, related_name='reductions')
    no_chickens = models.IntegerField(default=0)
    chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='flock_reduction')

    def save(self, *args, **kwargs):
        self.is_dead = True if self.dead_date != None else False
        super(Chicken, self).save(*args, **kwargs)


# class FlockSelection():
