from django.db import models
from django.conf import settings
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class Country(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class City(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name='cities')

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f'{self.country.name} - {self.name}'


class House(CoreModel):
    name = models.CharField(max_length=10,  unique=True)
    farm = models.ForeignKey(
        'farms.Farm', on_delete=models.SET_NULL, null=True, related_name='houses')

    history = HistoricalRecords()

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class LayedPlace(CoreModel):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name
