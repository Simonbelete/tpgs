from django.db import models
from datetime import datetime
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from breeds.models import BreedType
from farms.models import Farm


class Hatchery(CoreModel):
    date = models.DateField()
    no_egg = models.IntegerField()
    breed_type = models.ForeignKey(
        BreedType, on_delete=models.SET_NULL, null=True, blank=True, related_name='hatchery')
    farm = models.ForeignKey(
        Farm, on_delete=models.SET_NULL, null=True, blank=True, related_name='hatchery')

    history = HistoricalRecords()

    def __str__(self):
        return "%s (%s)" % (datetime.strptime(str(self.date), '%Y-%m-%d').strftime('%d/%m/%Y'), self.no_egg)


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
    remark = models.TextField(null=True, blank=True)

    history = HistoricalRecords()


class Candling(CoreModel):
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.CASCADE, related_name='candling')
    date = models.DateField()
    no_egg = models.IntegerField()
    infertile_egg = models.IntegerField(null=True, blank=True)
    no_of_hatched = models.IntegerField(null=True, blank=True)
    no_dead = models.IntegerField(null=True, blank=True)
    no_culled = models.IntegerField(null=True, blank=True)

    history = HistoricalRecords()
