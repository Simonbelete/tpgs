from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class BreedPair(CoreModel):
    date = models.DateField(null=True, blank=True)
    sire = models.ForeignKey(
        'chickens.Chicken', on_delete=models.SET_NULL, null=True, related_name='father')
    dam = models.ForeignKey(
        'chickens.Chicken', on_delete=models.SET_NULL, null=True, related_name='mother')

    history = HistoricalRecords()

    def __str__(self):
        return "%s %s" % (self.sire.name, self.dam.name)

    @property
    def children_count(self):
        return self.children.count()
