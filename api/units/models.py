from django.db import models


class Unit(models.Model):
    name = models.CharField(max_length=100, unique=True)


class UnitConverter(models.Model):
    unit_from = models.ForeignKey(
        Unit, on_delete=models.CASCADE, related_name='unit_from')
    unit_to = models.ForeignKey(
        Unit, on_delete=models.CASCADE, related_name='unit_to')
    ratio = models.FloatField(default=1)
