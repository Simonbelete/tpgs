from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel


class FeedType(CoreModel):
    name = models.CharField(max_length=250, unique=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    history = HistoricalRecords()

    def __str__(self):
        return self.name


class Feed(CoreModel):
    week = models.IntegerField(default=0)
    chicken = models.ForeignKey(
        'chickens.Chicken', on_delete=models.CASCADE, related_name='feeds')
    weight = models.DecimalField(
        max_digits=10, decimal_places=3, default=0, null=True, blank=True)
    feed_type = models.ForeignKey(
        FeedType, on_delete=models.SET_NULL, null=True, blank=True, related_name='feeds')
    feed_offered = models.DecimalField(
        max_digits=10, decimal_places=3, default=0)
    feed_refusal = models.DecimalField(
        max_digits=10, decimal_places=3, default=0)

    history = HistoricalRecords()

    def save(self, *args, **kwargs):
        self.weight = self.feed_offered - self.feed_refusal
        super(Feed, self).save(*args, **kwargs)
