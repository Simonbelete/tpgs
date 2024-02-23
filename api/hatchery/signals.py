from django.dispatch import receiver
from django.db.models.signals import pre_save, post_delete

from .models import Hatchery
from .tasks import sync_hatchery_to_chicken, unsync_hatchery_from_chicken


@receiver(pre_save, sender=Hatchery)
def sync_to_chicken(sender, instance, update_fields=None, **kwargs):
    sync_hatchery_to_chicken.delay(hatchery=instance)


@receiver(post_delete, sender=Hatchery)
def remove_hatchery(sender, instance, update_fields=None, **kwargs):
    unsync_hatchery_from_chicken(hatchery=instance)
