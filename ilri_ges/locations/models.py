from django.db import models
from django.conf import settings

from core.models import CoreModel


class Country(CoreModel):
    name = models.CharField(max_length=100, unique=True)

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
    name = models.CharField(max_length=10)
    farm = models.ForeignKey(
        'farms.Farm', on_delete=models.SET_NULL, null=True, related_name='houses')

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class LayedPlace(CoreModel):
    name = models.CharField(max_length=250)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
