from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Feed
from .tasks import create_individual_feed_from_batch


@receiver(post_save, sender=Feed)
def feed_post_save(sender, instance, **kwargs):
    create_individual_feed_from_batch(instance.id)
