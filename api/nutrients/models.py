from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from units.models import Unit


class NutrientGroup(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    @property
    def display_name(self):
        return self.name


class Nutrient(CoreModel):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=100, null=True, blank=True)
    abbreviation = models.CharField(max_length=10, unique=True)
    description = models.TextField(null=True, blank=True)
    nutrient_group = models.ForeignKey(
        NutrientGroup, on_delete=models.SET_NULL, null=True, blank=True, related_name='nutrients')
    unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, blank=True, related_name='nutrients')
    order = models.IntegerField(default=10, null=True, blank=True)

    history = HistoricalRecords()

    class Meta:
        ordering = ['order']

    @property
    def display_name(self):
        if (self.unit):
            return "{abbreviation} ({unit})".format(abbreviation=self.abbreviation, unit=self.unit.name)
        else:
            return self.abbreviation
