from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from eggs.models import Egg
from breeds.models import Breed

class Hatchery(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    incubation_moved_date = models.DateField(null=True, blank=True)
    hatch_date = models.DateField(null=True, blank=True)
    breed = models.ForeignKey(
        Breed, on_delete=models.SET_NULL, null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    history = HistoricalRecords()

    @property
    def display_name(self):
        return self.name
    
class HatcheryEgg(CoreModel):
    """ Single Chicken's egg """
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.CASCADE, related_name='hatchery_eggs')
    egg = models.ForeignKey(
        Egg, on_delete=models.CASCADE, related_name='hatchery_eggs')
    # Number of eggs to hatchery from the given week i.e No of egg set
    no_eggs = models.IntegerField()
    # Candling
    canndle_date = models.DateField(null=True, blank=True)
    candled_eggs = models.IntegerField(null=True, blank=True)
    infertile_egg = models.IntegerField(null=True, blank=True)
    no_of_hatched = models.IntegerField(null=True, blank=True)
    no_dead = models.IntegerField(null=True, blank=True)
    no_culled = models.IntegerField(null=True, blank=True)

class Incubation(CoreModel):
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.CASCADE, related_name='hatchery_incubation')
    date_time = models.DateTimeField()
    temperature_celsius = models.DecimalField(
        max_digits=6, decimal_places=3, default=0)
    humidity_fahrenheit = models.DecimalField(
        max_digits=6, decimal_places=3, default=0)
    humidity_percent = models.DecimalField(
        max_digits=6, decimal_places=3, default=0)
    remark = models.TextField(null=True, blank=True)

    history = HistoricalRecords()