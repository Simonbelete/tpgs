from django.db import models

from core.models import CoreModel


class BreedType(CoreModel):
    name = models.CharField(max_length=250, unique=True)
    color = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return self.name
