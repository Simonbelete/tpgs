import math
from typing import Collection, Iterable, Optional
from django.db import models
from django.db import transaction
from django.core.exceptions import ValidationError
from simple_history.models import HistoricalRecords

from core.models import CoreModel, BaseActiveManager
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
        """ Total Number of Alive Chickens
        It includes both individual and bulk chickens
        """
        return self.total_accusation - self.total_reduction

    @property
    def total_taged_chickens(self):
        """ Total Number of Alive Chickens """
        accusation = self.accusations.all().aggregate(count=models.Count('chickens'))['count']
        reduction = self.reduction.all().aggregate(count=models.Count('chickens'))['count']
        return accusation - reduction

    @property
    def total_accusation(self):
        """
            TODO: separate alive and dead 
        """
        result = self.accusations.all().aggregate(
            male_sum=models.Sum('no_male_chickens'), female_sum=models.Sum('no_female_chickens'), count=models.Count('chickens'))
        return (result['male_sum'] or 0) + (result['female_sum'] or 0) + result['count']

    @property
    def total_female_accusation(self):
        result = self.accusations.all().aggregate(
            sum=models.Sum('no_female_chickens'), count=models.Count('chickens'))
        return (result['sum'] or 0) + result['count']

    @property
    def total_reduction(self):
        result = self.reductions.all().aggregate(
            male_sum=models.Sum('no_male_chickens'), female_sum=models.Sum('no_female_chickens'), count=models.Count('chickens'))
        return (result['male_sum'] or 0) + (result['female_sum'] or 0) + result['count']


class FlockAccusation(CoreModel):
    ACCUSATION_TYPE = [
        ('')
    ]

    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, related_name='accusations')
    accusation = models.ForeignKey(
        Accusation, on_delete=models.SET_NULL, null=True, blank=True)
    accusation_date = models.DateField(null=True, blank=True)
    no_male_chickens = models.PositiveIntegerField(default=0)
    no_female_chickens = models.PositiveIntegerField(default=0)
    chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='flock_accusation')
    note = models.TextField(null=True, blank=True)
    history = HistoricalRecords()

    @property
    def accusation_week(self):
        """ On Witch week reduction preformed """
        return math.floor((self.accusation_date - self.flock.hatch_date).days / 7)

    @property
    def total_chickens(self):
        return self.no_male_chickens + self.no_female_chickens + len(self.chickens)

    @property
    def total_male_chickens(self):
        return self.no_female_chickens + self.chickens.filter(sex='M').count()

    @property
    def total_female_chickens(self):
        return self.no_female_chickens + self.chickens.filter(sex='F').count()

    def save(self,  *args, **kwargs) -> None:
        self.clean()
        return super().save(*args, **kwargs)

    def clean(self) -> None:
        """
            - Both values cannot have data at the same time
        """
        if ((self.no_female_chickens != 0 or self.no_male_chickens != 0) and self.chickens != None):
            raise ValidationError({
                'no_female_chickens': 'Can not have value if chickens are set',
                'chickens': 'Can not have value if no_chickens are set'
            })
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
    no_male_chickens = models.PositiveIntegerField(default=0)
    no_female_chickens = models.PositiveIntegerField(default=0)
    reduction_date = models.DateField(null=True, blank=True)
    chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='flock_reduction')
    reason = models.CharField(max_length=1, choices=REDUCTION_REASON,
                              null=True, blank=True, default=None)
    note = models.TextField(null=True, blank=True)

    @property
    def reduction_week(self):
        """ On Witch week reduction preformed """
        return math.floor((self.reduction_date - self.flock.hatch_date).days / 7)

    @property
    def total_chickens(self):
        return self.no_male_chickens + self.no_female_chickens + len(self.chickens)

    @property
    def total_male_chickens(self):
        return self.no_female_chickens + self.chickens.filter(sex='M').count()

    @property
    def total_female_chickens(self):
        return self.no_female_chickens + self.chickens.filter(sex='M').count()

    def save(self,  *args, **kwargs) -> None:
        self.clean()
        return super().save(*args, **kwargs)

    def clean(self) -> None:
        """
            - Both values cannot have data at the same time
            - Check if the chicken is part of the current flock
        """
        if ((self.no_female_chickens != 0 or self.no_male_chickens != 0) and self.chickens != None):
            raise ValidationError({
                'no_chickens': 'Can not have value if chickens are set',
                'chickens': 'Can not have value if no_chickens are set'
            })
        for chicken in self.chickens:
            if (chicken.flock.id != self.flock.id):
                raise ValidationError(
                    {'chickens': 'Chicken is not part of the flock'})
        if (self.reduction_date < self.flock.hatch_date):
            return ValidationError({
                'reduction_date': 'Cannot be less than flock hatch date'
            })
        return super().clean()

# class FlockSelection():
