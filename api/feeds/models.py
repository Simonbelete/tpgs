from django.db import models
from simple_history.models import HistoricalRecords
from core.validators import WEEK_VALIDATOR

from core.models import CoreModel
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
    weight = models.DecimalField(
        max_digits=7, decimal_places=3, null=True, blank=True, default=0)  # g
    history = HistoricalRecords()

    # class Meta:
    #     unique_together = ['flock', 'pen', 'chicken', 'week']

    @property
    def adjusted_weight(self):
        return 0
        # if (not self.hat):
        #     return self.weight / self.flock.total_chickens
        # elif (self.chicken):
        #     return self.weight
        # else:
        #     return self.weight / (self.flock.total_chickens + 1)

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

    @property
    def total_chickens(self):
        return Chicken.objects.filter(pen=self.pen, hatchery=self.hatchery).count()

    @property
    def children_feed_count(self):
        return self.children.count()
