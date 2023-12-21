from django.dispatch import receiver
from django.db.models.signals import pre_save

from chickens.models import Chicken
from .tasks import archive_resources, unarchive_resources


@receiver(pre_save, sender=Chicken)
def archive_all_on_archive(sender, instance, update_fields=None, **kwargs):
    """Archive Feed, Egg, Weight on Archiving/Unarchiving"""
    try:
        old_instance = Chicken.all.get(pk=instance.id)

        if (old_instance.is_active == instance.is_active):
            return

        if (instance.is_active):
            unarchive_resources.delay(instance=instance)
        else:
            archive_resources.delay(instance=instance)
    except Chicken.DoesNotExist:
        return None
