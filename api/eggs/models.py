from django.db import models
from simple_history.models import HistoricalRecords
from django.core.exceptions import ValidationError

from core.models import CoreModel
from flocks.models import Flock
from units.models import Unit
from chickens.models import Chicken


class Egg(CoreModel):
    flock = models.ForeignKey(
        Flock, on_delete=models.CASCADE, null=True, blank=True, related_name='eggs')
    chicken = models.ForeignKey(
        Chicken, on_delete=models.CASCADE, null=True, blank=True, related_name='eggs')
    week = models.IntegerField(default=0)
    eggs = models.IntegerField()
    weight = models.FloatField()
    weight_unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, blank=True, related_name='eggs')
    history = HistoricalRecords()

    class Meta:
        unique_together = ['flock', 'chicken', 'week']

    def save(self,  *args, **kwargs) -> None:
        self.clean()
        return super().save(*args, **kwargs)

    def clean(self) -> None:
        if (self.flock != None or self.chickens != None):
            raise ValidationError({
                'flock': 'Can not have value if chickens are set',
                'chickens': 'Can not have value if flock are set'
            })
        if (self.chicken):
            if Egg.objects.filter(flock=self.chicken.flock, week=self.week).count() > 0:
                raise ValidationError({
                    'week': 'Already exists'
                })

        return super().clean()
