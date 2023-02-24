from django.db import models

from core.models import CoreModel
from chickens.models import Chicken


class Weight(CoreModel):
    week = models.IntegerField(default=0)
    weight = models.DecimalField(
        max_digits=10, decimal_places=3, default=0)
    chicken = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, related_name='weights')
