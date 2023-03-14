import math
from django.db import models
from datetime import date
from datetime import timedelta, date
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from flocks.models import Flock
from farms.models import Farm
from locations.models import House, LayedPlace
from breeds.models import BreedType
from weights.models import Weight
from breeding_pairs.models import BreedPair


class ChickenManager(models.Manager):
    def get_week_from_date(self, pk, date):
        date_diff = date - self.get(pk=pk).hatch_date
        week = date_diff.days / 7
        return math.floor(week)


class Chicken(CoreModel):
    objects = ChickenManager()
    SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )

    breed_pair = models.ForeignKey(
        BreedPair, on_delete=models.SET_NULL, null=True, blank=True, related_name='children')
    flock = models.ForeignKey(
        Flock, on_delete=models.SET_NULL, null=True, blank=True, related_name='chickens')
    tag = models.CharField(max_length=250, unique=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES, default='')
    farm = models.ForeignKey(
        Farm, on_delete=models.SET_NULL, null=True, blank=True, related_name='chickens')
    house = models.ForeignKey(
        House, on_delete=models.SET_NULL, null=True, blank=True, related_name='chickens')
    breed_type = models.ForeignKey(
        BreedType, on_delete=models.SET_NULL, null=True, blank=True, related_name='chickens')
    layed_place = models.ForeignKey(
        LayedPlace, on_delete=models.SET_NULL, null=True, blank=True)
    is_double_yolk = models.BooleanField(default=False)
    hatch_date = models.DateField(null=True, blank=True)
    # Chickens self egg weight
    egg_weight = models.DecimalField(
        max_digits=10, decimal_places=3, default=0)

    is_dead = models.BooleanField(default=False)
    days_alive = models.IntegerField(null=True, blank=True)
    dead_date = models.DateField(null=True, blank=True)

    history = HistoricalRecords()

    def __str__(self):
        return self.tag

    @property
    def name(self):
        house = self.house.name if self.house != None else ""
        farm = self.farm.name if self.farm != None else ""
        sex = self.sex
        return "%s %s" % (self.tag, sex)

    @property
    def age(self):
        if (self.hatch_date == None):
            return 0

        birth_date = self.hatch_date
        today = date.today()
        age = today.year - birth_date.year - \
            ((today.month, today.day) < (birth_date.month, birth_date.day))

        return age

    @property
    def age_in_days(self):
        if self.hatch_date == None:
            return 0
        return (date.today() - self.hatch_date).days

    @property
    def age_in_weeks(self):
        if self.hatch_date == None:
            return 0
        return round(self.age_in_days/7, 2)

    @property
    def hatch_weight(self):
        """" Hatch Weight is computed from week 0 weight """
        return Weight.objects.get(pk=self.id).earliest('week')

    @property
    def morality_date(self):
        added_date = self.hatch_date + timedelta(days=self.days_alive)
        return self.dead_date if self.dead_date != None else added_date
