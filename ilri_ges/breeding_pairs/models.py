from django.db import models

from chickens.models import Chicken
from core.models import CoreModel


class BreedPair(CoreModel):
    date = models.DateField(null=True, blank=True)
    sire = models.ForeignKey(
        Chicken, on_delete=models.SET_NULL, null=True, related_name='father')
    dam = models.ForeignKey(
        Chicken, on_delete=models.SET_NULL, null=True, related_name='mother')
