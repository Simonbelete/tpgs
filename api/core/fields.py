from django.db import models

WEIGHT_IN_GRAM_FIELD = models.DecimalField(
    max_digits=16, decimal_places=3, null=True, blank=True, default=0)
