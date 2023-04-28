from django.db import models

# Create your models here.


class Ration(models.Model):
    name = models.CharField(max_length=100)

# class
#     dm = models.FloatField()
#     me = models.FloatField()
#     cp = models.FloatField()
#     lys = models.FloatField()
#     meth = models.FloatField()
#     mc = models.FloatField()
#     ee = models.FloatField()
#     cf = models.FloatField()
#     ca = models.FloatField()
#     p = models.FloatField()
#     ratio_min = models.FloatField()
#     ratio_max = models.FloatField()
