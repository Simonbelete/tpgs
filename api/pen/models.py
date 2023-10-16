from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from houses.models import House

class Pen(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    house = models.ForeignKey(House, on_delete=models.CASCADE, null=True, blank=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def display_name(self):
        return "{house} / {pen}".format(house=self.house.name, pen=self.name)
