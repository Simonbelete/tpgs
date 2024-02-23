from django.dispatch import receiver
from django.db.models.signals import pre_save, post_delete

from .models import Hatchery
from .tasks import sync_selected_chickens, unsync_selected_chickens, sync_unselected_chickens, unsync_unselected_chickens


@receiver(pre_save, sender=Hatchery)
def sync_to_chicken(sender, instance, update_fields=None, **kwargs):
    sync_selected_chickens.delay(hatchery=instance)
    sync_unselected_chickens.delay(hatchery=instance)


@receiver(post_delete, sender=Hatchery)
def remove_hatchery(sender, instance, update_fields=None, **kwargs):
    unsync_selected_chickens.delay(hatchery=instance)
    unsync_unselected_chickens.delay(hatchery=instance)
