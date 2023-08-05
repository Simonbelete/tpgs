from typing import Iterable, Optional
from django.db import models

from simple_history.models import HistoricalRecords

from core.models import CoreModel
from accusation.models import Accusation
from chickens.models import Chicken
from breeds.models import Breed


class Flock(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    hatch_date = models.DateField()
    breed = models.ForeignKey(
        Breed, on_delete=models.SET_NULL, null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    @property
    def total_chickens(self):
        """ Alive Chickens """
        accusations = self.accusations.objects.aggregate(
            sum=models.Sum('no_chicken'), count=models.Count('chickens'))
        accusations_total = accusations['sum'] + accusations['count']
        return accusations_total

    @property
    def total_accusation(self):
        """ Total number chickens"""
        result = self.accusations.objects.aggregate(
            sum=models.Sum('no_chicken'), count=models.Count('chickens'))
        return result['sum'] + result['count']

    @property
    def total_accusation(self):
        """ Total number chickens"""
        return 10
        # return self.reductions.objects.aggregate(models.Sum('no_chicken'))


class FlockAccusation(CoreModel):
    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, related_name='accusations')
    accusation = models.ForeignKey(
        Accusation, on_delete=models.SET_NULL, null=True, blank=True)
    accusation_date = models.DateField(null=True, blank=True)
    no_chicken = models.PositiveIntegerField()
    chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='flock_accusation')
    history = HistoricalRecords()

    def clean(self) -> None:
        """
            - Both values cannot have data at the same time
        """
        if (self.no_chicken != None or self.chickens != None):
            raise ValueError('Both chickens can not have value')
        return super().clean()


class FlockReduction(CoreModel):
    REDUCTION_REASON = [
        ('C', 'Cull'),
        ('D', 'Death'),
        ('S', 'Sold'),
        ('L', 'Lost'),
        ('O', 'Other')
    ]
    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, related_name='reductions')
    no_chicken = models.IntegerField(default=0)
    chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='flock_reduction')
    reason = models.CharField(max_length=1, choices=REDUCTION_REASON,
                              null=True, blank=True, default=None)
    note = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # self.is_dead = True if self.dead_date != None else False
        super(FlockReduction, self).save(*args, **kwargs)

    def clean(self) -> None:
        """
            - Both values cannot have data at the same time
        """
        if (self.no_chicken != None or self.chickens != None):
            raise ValueError('Both chickens can not have value')
        return super().clean()

# class FlockSelection():
