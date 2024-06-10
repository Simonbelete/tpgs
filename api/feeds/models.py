from django.db import models
from simple_history.models import HistoricalRecords
from core.validators import WEEK_VALIDATOR
from django.db.models import Q
from rest_framework.exceptions import ValidationError

from core.models import CoreModel
from core.fields import WEIGHT_IN_GRAM_FIELD
from hatchery.models import Hatchery
from chickens.models import Chicken
from formulas.models import Formula
from pen.models import Pen
from chickens.models import Chicken


class Feed(CoreModel):
    hatchery = models.ForeignKey(
        Hatchery, on_delete=models.CASCADE, null=True, blank=True, related_name='feeds')
    pen = models.ForeignKey(
        Pen, on_delete=models.CASCADE, null=True, blank=True, related_name='feeds')
    parent = models.ForeignKey(
        'self', models.CASCADE, blank=True, null=True, related_name='children')
    chicken = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, null=True, blank=True, related_name='feeds')
    formula = models.ForeignKey(
        Formula, on_delete=models.SET_NULL, null=True, blank=True, related_name='feeds')
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
        super().full_clean(exclude, validate_unique)
        
        if(self.week > self.chicken.age_in_weeks):
            raise ValidationError({
                'chicken': ["Given week is greater than the chicken's age"],
                'week': ["Given week is greater than the chicken's age"]
            })

    @property
    def display_name(self):
        if (self.hatchery):
            return "{0} W{1}".format(self.hatchery.name, self.week)
        else:
            return "{0} W{1}".format(self.chicken.tag, self.week)

    @property
    def total_chickens(self):
        chickens = Chicken.objects.filter(hatchery=self.hatchery)
        if (self.pen):
            chickens = chickens.filter(pen=self.pen)
        return chickens.count()

    @property
    def children_feed_count(self):
        return self.children.count()

    def get_total_no_of_chickens(self):
        if (self.chicken):
            return 1
        elif (self.hatchery and self.pen):
            return Chicken.objects.filter(hatchery=self.hatchery, pen=self.pen).count()
        else:
            return 0

    def get_single_chicken_weight(self):
        if (self.chicken):
            return self.weight
        elif (self.Hatchery and self.pen):
            total_no_chickens = self.get_total_no_of_chickens()
            return self.weight / total_no_chickens if total_no_chickens != 0 else 0
        else:
            return 0

    def save(self,  *args, **kwargs) -> None:
        self.full_clean()
        return super().save(*args, **kwargs)
    
    def full_clean(self, exclude=None, validate_unique=True):
        super().full_clean(['created_by'], validate_unique)
            
        if(self.week > self.chicken.age_in_weeks):
             raise ValidationError({
                'week': ["Given week is greater than the chicken's age"]
            })