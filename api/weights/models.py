from django.db import models
from simple_history.models import HistoricalRecords
from core.validators import WEEK_VALIDATOR

from core.models import CoreModel
from core.fields import WEIGHT_IN_GRAM_FIELD
from chickens.models import Chicken


class Weight(CoreModel):
    chicken = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, null=True, blank=True, related_name='weights')
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR, default=0)
    weight = WEIGHT_IN_GRAM_FIELD
    history = HistoricalRecords()

    class Meta:
        unique_together = ['chicken', 'week']
