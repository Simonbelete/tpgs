from django.db import models

from core.models import CoreModel
from locations.models import City


class Farm(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    city = models.ForeignKey(
        City, on_delete=models.SET_NULL, null=True, related_name='farms')

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
