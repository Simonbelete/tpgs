from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from units.models import Unit


class Chicken(CoreModel):
    SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )

    tag = models.CharField(max_length=250, unique=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES,
                           null=True, blank=True, default=None)
    sire = models.ForeignKey(
        'self', models.SET_NULL, blank=True, null=True, limit_choices_to={'sex', 'M'}, related_name='children_of_sire')
    dam = models.ForeignKey(
        'self', models.SET_NULL, blank=True, null=True, limit_choices_to={'sex', 'F'}, related_name='children_of_dam')
    history = HistoricalRecords()

    def __str__(self):
        return self.tag

    # def ancestors(self):
    #     '''Returns a list of this person's ancestors (their parents and all of
    #     their parents' ancestors).'''
    #      if self.mother:
    #         yield self.mother
    #         yield from self.mother.ancestors()
    #     if self.father:
    #         yield self.father
    #         yield from self.father.ancestors()
