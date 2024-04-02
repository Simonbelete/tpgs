from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

from chickens.models import Chicken
from .tasks import archive_resources, unarchive_resources
from feeds.tasks import _create_individual_feed_from_batch

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
            
        # re-sync batch feed intake if pen & hatchery(Batch) is changed
        if(old_instance.pen != instance.pen or old_instance.hatchery != instance.hatchery):
            _create_individual_feed_from_batch()
    except Chicken.DoesNotExist:
        return None