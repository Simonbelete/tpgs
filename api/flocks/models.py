from typing import Iterable, Optional
from django.db import models
from django.db import transaction
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
        """ Total Number of Alive Chickens """
        return self.total_accusation - self.total_reduction

    @property
    def total_accusation(self):
        result = self.accusations.all().aggregate(
            sum=models.Sum('no_chicken'), count=models.Count('chickens'))
        return (result['sum'] or 0) + result['count']

    @property
    def total_reduction(self):
        result = self.reductions.all().aggregate(
            sum=models.Sum('no_chicken'), count=models.Count('chickens'))
        return (result['sum'] or 0) + result['count']


class FlockAccusation(CoreModel):
    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, related_name='accusations')
    accusation = models.ForeignKey(
        Accusation, on_delete=models.SET_NULL, null=True, blank=True)
    accusation_date = models.DateField(null=True, blank=True)
    no_chicken = models.PositiveIntegerField()
    chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='flock_accusation')
    note = models.TextField(null=True, blank=True)
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
        ('T', 'Tagged'),
        ('O', 'Other')
    ]
    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, related_name='reductions')
    no_chicken = models.IntegerField(default=0)
    reduction_date = models.DateField(null=True, blank=True)
    chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='flock_reduction')
    reason = models.CharField(max_length=1, choices=REDUCTION_REASON,
                              null=True, blank=True, default=None)
    note = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        """ Make Individual chickens to dead"""
        with transaction.atomic():
            if (self.chickens):
                for chicken in self.chickens:
                    print('*****')
                    print(chicken)
            super(FlockReduction, self).save(*args, **kwargs)

    def clean(self) -> None:
        """
            - Both values cannot have data at the same time
            - Check if the chicken is part of the current flock
        """
        if (self.no_chicken != None or self.chickens != None):
            raise ValueError('Both chickens can not have value')
        for chicken in self.chickens:
            if (chicken.flock.id != self.flock.id):
                raise ValueError('Chicken is not part of the flock')
        return super().clean()

# class FlockSelection():
