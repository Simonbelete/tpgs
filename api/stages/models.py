from django.db import models

from core.models import CoreModel


class Stage(CoreModel):
    name = models.CharField(max_length=250)
    min_week = models.IntegerField()
    max_week = models.IntegerField()

    def __str__(self):
        return self.name
