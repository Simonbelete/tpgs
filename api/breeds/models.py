from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from core.validators import WEEK_VALIDATOR, PERCENTAGE_VALIDATOR
from units.models import Unit


class Breed(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    color = models.CharField(max_length=10, null=True, blank=True)
    hdep_desirable_avg = models.PositiveIntegerField(
        validators=PERCENTAGE_VALIDATOR, null=True, blank=True)
    hhep_desirable_avg = models.PositiveIntegerField(
        validators=PERCENTAGE_VALIDATOR, null=True, blank=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name


class BreedHDEPGuide(CoreModel):
    """Hen-Day Egg Production (HDEP)
    """
    breed = models.ForeignKey(
        Breed, on_delete=models.CASCADE)
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR)
    hdep = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=6, decimal_places=3, default=0, null=True, blank=True)
    history = HistoricalRecords()

    @property
    def display_name(self):
        return "{breed} {week}".format(breed=self.breed.name, week=self.week)


class BreedHHEPGuide(CoreModel):
    """Hen-Housed Egg Production (HHEP)
    """
    breed = models.ForeignKey(
        Breed, on_delete=models.CASCADE)
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR)
    hhep = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=6, decimal_places=3, default=0, null=True, blank=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ['breed', 'week']

    @property
    def display_name(self):
        return "{breed} {week}".format(breed=self.breed.name, week=self.week)


class BreedWeightGuideline(CoreModel):
    breed = models.ForeignKey(
        Breed, on_delete=models.CASCADE)
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR)
    weight = models.DecimalField(max_digits=7, decimal_places=3,null=True, blank=True, default=0) #kg
    history = HistoricalRecords()

    class Meta:
        unique_together = ['breed', 'week']

    @property
    def display_name(self):
        return "{breed} {week}".format(breed=self.breed.name, week=self.week)

class BreedFeedGuideline(CoreModel):
    breed = models.ForeignKey(
        Breed, on_delete=models.CASCADE)
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR)
    feed = models.DecimalField(max_digits=7, decimal_places=3,null=True, blank=True, default=0) #kg
    history = HistoricalRecords()

    class Meta:
        unique_together = ['breed', 'week']

    @property
    def display_name(self):
        return "{breed} {week}".format(breed=self.breed.name, week=self.week)


class BreedEggGuideline(CoreModel):
    breed = models.ForeignKey(
        Breed, on_delete=models.CASCADE)
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR)
    egg = models.IntegerField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True) # in g
    history = HistoricalRecords()
    
    class Meta:
        unique_together = ['breed', 'week']
    
    @property
    def display_name(self):
        return "{breed} {week}".format(breed=self.breed.name, week=self.week)
