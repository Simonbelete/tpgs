from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Feed
from chickens.models import Chicken


@receiver(post_save, sender=Feed)
def create_individual_from_batch(sender, instance, **kwargs):
    try:
        chickens = Chicken.objects.filter(
            pen=instance.pen, hatchery=instance.hatchery).exclude(reduction_date__isnull=True)

        individual_weight = instance.weight / \
            chickens.count() if chickens.count() != 0 else 0

        for chicken in chickens.iterator():
            created, feed = Feed.objects.update_or_create(week=instance.week, chicken=chicken, defaults={
                'formula': instance.formula,
                'weight': individual_weight,
                'parent': instance
            })
    except Exception as ex:
        pass
