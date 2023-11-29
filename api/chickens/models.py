import math
from django.db import models
from simple_history.models import HistoricalRecords
from datetime import date

from core.models import CoreModel
from pen.models import Pen
from reduction_reason.models import ReductionReason
from breeds.models import Breed


class Chicken(CoreModel):
    SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )

    tag = models.CharField(max_length=250, unique=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES,
                           null=True, blank=True, default=None)
    hatch_date = models.DateField(null=True, blank=True)
    sire = models.ForeignKey(
        'self', models.SET_NULL, blank=True, null=True, limit_choices_to={'sex': 'M'}, related_name='children_of_sire')
    dam = models.ForeignKey(
        'self', models.SET_NULL, blank=True, null=True, limit_choices_to={'sex': 'F'}, related_name='children_of_dam')
    hatchery = models.ForeignKey(
        'hatchery.Hatchery', on_delete=models.SET_NULL, null=True, blank=True, related_name='chickens')
    pen = models.ForeignKey(
        Pen, on_delete=models.CASCADE, null=True, blank=True, related_name='chickens')
    breed = models.ForeignKey(
        Breed, on_delete=models.SET_NULL, null=True, blank=True)
    reduction_date = models.DateField(null=True, blank=True)
    reduction_reason = models.ForeignKey(
        ReductionReason, on_delete=models.SET_NULL, null=True, blank=True, related_name='chickens')

    generation = models.PositiveIntegerField(
        null=True, blank=True)

    history = HistoricalRecords()

    def __str__(self):
        return self.tag

    @property
    def display_name(self):
        return "{tag} {sex}".format(
            tag=self.tag,
            sex=self.sex
        )

    @property
    def age_in_days(self):
        if self.hatch_date == None:
            return 0
        return (date.today() - self.hatch_date).days

    @property
    def age_in_weeks(self):
        if self.hatch_date == None:
            return 0
        return math.floor(self.age_in_days/7)

    def offspring(self):
        if self.sex == 'M':
            return self.children_of_sire.all()
        elif self.sex == 'F':
            return self.children_of_dam.all()
        else:
            return []

    # def ancestors(self):
    #     '''Returns a list of this person's ancestors (their parents and all of
    #     their parents' ancestors).'''
    #      if self.mother:
    #         yield self.mother
    #         yield from self.mother.ancestors()
    #     if self.father:
    #         yield self.father
    #         yield from self.father.ancestors()


class Pedigree(models.Model):
    source = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, related_name="pedigree_source")
    target = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, related_name="pedigree_target")
    parent_type = models.CharField(max_length=250)
