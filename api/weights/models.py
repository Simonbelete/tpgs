from django.db import models
from simple_history.models import HistoricalRecords
from core.validators import WEEK_VALIDATOR
from rest_framework.exceptions import ValidationError

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
        ordering = ['-created_at']

    def save(self,  *args, **kwargs) -> None:
        self.full_clean()
        return super().save(*args, **kwargs)
        
    def full_clean(self, exclude=None, validate_unique=True):
        super().full_clean(['created_by'], validate_unique)

        if(self.week > self.chicken.age_in_weeks()):
            raise ValidationError({
                'chicken': ["Given week is greater than the chicken's age"],
                'week': ["Given week is greater than the chicken's age"]
            })

    @property
    def display_name(self):
        return "{0} W{1}".format(self.chicken.tag, self.week)