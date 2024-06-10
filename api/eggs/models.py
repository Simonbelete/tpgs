from django.db import models
from django.db.models import Sum
from simple_history.models import HistoricalRecords
from django.core.exceptions import ValidationError
from rest_framework import serializers
from core.validators import WEEK_VALIDATOR

from core.models import CoreModel
from core.fields import WEIGHT_IN_GRAM_FIELD
from chickens.models import Chicken
from hatchery.models import HatcheryEgg


class Egg(CoreModel):
    chicken = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, null=True, blank=True, related_name='eggs')
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR, default=0)
    eggs = models.IntegerField(null=True, blank=True)
    weight = WEIGHT_IN_GRAM_FIELD
    history = HistoricalRecords()

    class Meta:
        unique_together = ['chicken', 'week']
        ordering = ['-created_at']
        
    def save(self,  *args, **kwargs) -> None:
        self.full_clean()
        return super().save(*args, **kwargs)
        
    def full_clean(self, exclude=None, validate_unique=True):
        super().full_clean(exclude, validate_unique)
        
        if(self.week > self.chicken.age_in_weeks()):
            raise ValidationError({
                'chicken': ["Given week is greater than the chicken's age"],
                'week': ["Given week is greater than the chicken's age"]
            })
            
        if(self.chicken.sex != 'F'):
            raise ValidationError({
                'sex': ["Sex must be female"],
            })
              
        if(self.eggs < 1):
            raise ValidationError({
                'eggs': ["Must be greater than 0"],
            })

    @property
    def display_name(self):
        return "{chicken} W{week}".format(chicken=self.chicken.display_name, week=self.week)

    @property
    def display_available_eggs(self):
        return "{chicken} W{week} (Available Eggs {available_eggs}/{eggs})".format(chicken=self.chicken.tag, week=self.week, available_eggs=self.available_eggs, eggs=self.eggs)

    @property
    def hatchery_eggs(self):
        hatchery_eggs = HatcheryEgg.objects.filter(egg=self).aggregate(
            egg_set_sum=Sum('no_eggs'))['egg_set_sum'] or 0
        hatchery_eggs = hatchery_eggs if hatchery_eggs else 0
        return hatchery_eggs

    @property
    def available_eggs(self):
        hatchery_eggs = HatcheryEgg.objects.filter(egg=self).aggregate(
            egg_set_sum=Sum('no_eggs'))['egg_set_sum'] or 0
        hatchery_eggs = hatchery_eggs if hatchery_eggs else 0
        return (self.eggs or 0) - hatchery_eggs