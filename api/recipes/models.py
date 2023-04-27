from django.db import models

# Requirements


class Recipes(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=200)
    dm = models.FloatField()
    me = models.FloatField()
    cp = models.FloatField()
    lys = models.FloatField()
    meth = models.FloatField()
    mc = models.FloatField()
    ee = models.FloatField()
    cf = models.FloatField()
    ca = models.FloatField()
    p = models.FloatField()
