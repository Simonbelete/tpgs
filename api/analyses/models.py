from django.db import models
from django.db import connection

from core.fields import WEIGHT_IN_GRAM_FIELD
from core.validators import WEEK_VALIDATOR


class DirectoryList(models.Model):
    unique_id = models.CharField(max_length=255, primary_key=True)
    farm_name = models.TextField()
    farm_id = models.IntegerField()
    hatchery_id = models.IntegerField()
    hatchery_name = models.TextField()
    house_id = models.IntegerField()
    house_name = models.TextField()
    pen_id = models.IntegerField()
    pen_name = models.TextField()
    breed_id = models.IntegerField()
    breed_name = models.TextField()
    generation = models.TextField()

    class Meta:
        managed = False
        db_table = 'directory_list'

    @classmethod
    def refresh_view(cl):
        with connection.cursor() as cursor:
            cursor.execute(
                "REFRESH MATERIALIZED VIEW CONCURRENTLY directory_list")

    @property
    def name(self):
        return "{farm} / {breed} / {generation} / {hatchery} / {house} / {pen}".format(farm=self.farm_name,
                                                                                       breed=self.house_name,
                                                                                       generation=self.house_name,
                                                                                       hatchery=self.house_name,
                                                                                       house=self.pen_name,
                                                                                       pen=self.hatchery_name)

    @property
    def display_name(self):
        return "{farm} / {house} / {pen} / {flock}".format(farm=self.farm_name, house=self.house_name, pen=self.pen_name, flock=self.hatchery_name)

    @property
    def batch_name(self):
        return "{hatchery} / {house} / {pen}".format(house=self.house_name,
                                                     pen=self.pen_name,
                                                     hatchery=self.hatchery_name)


class ChickenRanking(models.Model):
    id = models.BigIntegerField(primary_key=True)
    chicken = models.ForeignKey('chickens.Chicken', on_delete=models.CASCADE)
    feed_weight_total = models.DecimalField(max_digits=19, decimal_places=3)
    feed_weight_avg = models.DecimalField(max_digits=19, decimal_places=3)
    body_weight_total = models.DecimalField(max_digits=19, decimal_places=3)
    body_weight_avg = models.DecimalField(max_digits=19, decimal_places=3)
    egg_number_total = models.DecimalField(max_digits=19, decimal_places=3)
    egg_number_avg = models.DecimalField(max_digits=19, decimal_places=3)
    egg_weight_total = models.DecimalField(max_digits=19, decimal_places=3)
    egg_weight_avg = models.DecimalField(max_digits=19, decimal_places=3)

    class Meta:
        managed = False
        db_table = 'chicken_ranking'


class ChickenRecordset(models.Model):
    id = models.BigIntegerField(primary_key=True)
    week = models.PositiveIntegerField(validators=WEEK_VALIDATOR, default=0)
    feed_weight = models.DecimalField(
        max_digits=16, decimal_places=3, null=True, blank=True, default=0)
    body_weight = models.DecimalField(
        max_digits=16, decimal_places=3, null=True, blank=True, default=0)
    no_eggs = models.IntegerField(null=True, blank=True)
    eggs_weight = models.DecimalField(
        max_digits=16, decimal_places=3, null=True, blank=True, default=0)

    class Meta:
        managed = False
        db_table = 'chicken_recordset'
