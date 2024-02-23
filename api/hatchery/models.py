from typing import Iterable
from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from breeds.models import Breed
from stages.models import Stage
from chickens.models import Chicken
from reduction_reason.models import ReductionReason


class Hatchery(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    incubation_moved_date = models.DateField(null=True, blank=True)
    hatch_date = models.DateField(null=True, blank=True)
    breed = models.ForeignKey(
        Breed, on_delete=models.SET_NULL, null=True, blank=True)
    note = models.TextField(null=True, blank=True)

    # Selection
    selected_from = models.ManyToManyField(
        "self", null=True, blank=True, related_name='moved_to')
    stage = models.ForeignKey(
        Stage, on_delete=models.SET_NULL, null=True, blank=True, related_name='selection')
    from_stage = models.ForeignKey(
        Stage, on_delete=models.SET_NULL, null=True, blank=True, related_name='from_selection')  # Stage History
    selected_chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='selected_selection')
    unselected_chickens = models.ManyToManyField(
        Chicken, null=True, blank=True, related_name='unselected_selection')
    reduction_date = models.DateField(null=True, blank=True)
    reduction_reason = models.ForeignKey(
        ReductionReason, on_delete=models.SET_NULL, null=True, blank=True, related_name='selection')
    generation = models.PositiveIntegerField(
        null=True, blank=True)

    history = HistoricalRecords()

    def save(self,  *args, **kwargs) -> None:
        if (not self.stage):
            self.stage = Stage.objects.get(order=1)
        return super().save(*args, **kwargs)

    @property
    def display_name(self):
        return self.name

    @property
    def hatchery_egg_count(self):
        return HatcheryEgg.objects.filter(hatchery=self.id).count()

    @property
    def incubation_count(self):
        return Incubation.objects.filter(hatchery=self.id).count()

    # Hatchery Egg Propery

    @property
    def total_egg_set(self):
        return self.total_egg_set()

    @property
    def total_removed_eggs(self):
        """Culled, Dead and infertile eggs"""
        total = 0
        for he in self.hatchery_eggs.iterator():
            total += (he.no_dead or 0) + (he.no_culled or 0) + \
                (he.infertile_egg or 0)

    @property
    def total_infertile_eggs(self):
        return self.total_infertile_egg()

    @property
    def total_hatched_egg(self):
        return self.total_hatched_egg()

    def total_egg_set(self):
        """Total no of eggs seted"""
        total = 0
        for he in self.hatchery_eggs.iterator():
            total = total + (he.no_eggs or 0)
        return total

    def total_infertile_egg(self):
        total = 0
        for he in self.hatchery_eggs.iterator():
            total = total + (he.infertile_egg or 0)
        return total

    def total_hatched_egg(self):
        total = 0
        for he in self.hatchery_eggs.iterator():
            total = total + (he.no_of_hatched or 0)
        return total


class HatcheryEgg(CoreModel):
    """ Single Chicken's egg """
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.CASCADE, related_name='hatchery_eggs')
    egg = models.ForeignKey(
        'eggs.Egg', on_delete=models.CASCADE, related_name='hatchery_eggs')
    # Number of eggs to hatchery from the given week i.e No of egg set
    no_eggs = models.IntegerField()
    # Candling
    canndle_date = models.DateField(null=True, blank=True)
    candled_eggs = models.IntegerField(null=True, blank=True)
    infertile_egg = models.IntegerField(null=True, blank=True)
    # Hatchery
    no_of_hatched = models.IntegerField(null=True, blank=True)
    no_dead = models.IntegerField(null=True, blank=True)
    no_culled = models.IntegerField(null=True, blank=True)
    history = HistoricalRecords()

    @property
    def display_name(self):
        return "{hatchery} {egg}".format(hatchery=self.hatchery.name, egg=self.egg.display_name)


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

    @property
    def display_name(self):
        return "{hatchery} {date}".format(hatchery=self.hatchery.name, date=self.date_time)
