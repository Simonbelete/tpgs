from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from breeds.models import BreedType


class Hatchery(CoreModel):
    date = models.DateField()
    no_egg = models.IntegerField()
    breed_type = models.ForeignKey(
        BreedType, on_delete=models.SET_NULL, null=True, blank=True, related_name='hatchery')

    history = HistoricalRecords()


class Incubation(CoreModel):
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.CASCADE, related_name='hatchery')
    date_time = models.DateTimeField()
    temperature_celsius = models.DecimalField(
        max_digits=6, decimal_places=3, default=0)
    humidity_fahrenheit = models.DecimalField(
        max_digits=6, decimal_places=3, default=0)
    humidity_percent = models.DecimalField(
        max_digits=6, decimal_places=3, default=0)
    remark = models.TextField()

    history = HistoricalRecords()


class Candling(CoreModel):
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.CASCADE, related_name='hatchery')
    date = models.DateField()
    no_egg = models.IntegerField()
    infertile_egg = models.IntegerField()
    no_of_hatched = models.IntegerField()
    no_dead = models.IntegerField()
    no_culled = models.IntegerField()

    history = HistoricalRecords()
