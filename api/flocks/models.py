from django.db import models

from core.models import CoreModel


class Flock(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    hatch_date = models.DateField()

    def __str__(self):
        return self.name
