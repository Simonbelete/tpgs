from django.db import models
from django.db.models import Sum
from simple_history.models import HistoricalRecords
from django.core.exceptions import ValidationError
from rest_framework import serializers

from core.models import CoreModel
from chickens.models import Chicken
from hatchery.models import HatcheryEgg


class Egg(CoreModel):
    chicken = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, null=True, blank=True, related_name='eggs')
    week = models.IntegerField(default=0)
    eggs = models.IntegerField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)  # in g
    history = HistoricalRecords()

    class Meta:
        unique_together = ['chicken', 'week']

    @property
    def display_name(self):
        return "{chicken} W{week}".format(chicken=self.chicken.display_name, week=self.week)

    @property
    def display_available_eggs(self):
        return "{chicken} W{week} (Available Eggs {available_eggs}/{eggs})".format(chicken=self.chicken.tag, week=self.week, available_eggs=self.available_eggs, eggs=self.eggs)

    @property
    def hatchery_eggs(self):
        hatchery_eggs = HatcheryEgg.objects.filter(egg=self).aggregate(
            egg_set_sum=Sum('no_eggs'))['egg_set_sum'] or 0
        hatchery_eggs = hatchery_eggs if hatchery_eggs else 0
        return hatchery_eggs

    @property
    def available_eggs(self):
        hatchery_eggs = HatcheryEgg.objects.filter(egg=self).aggregate(
            egg_set_sum=Sum('no_eggs'))['egg_set_sum'] or 0
        hatchery_eggs = hatchery_eggs if hatchery_eggs else 0
        return (self.eggs or 0) - hatchery_eggs
