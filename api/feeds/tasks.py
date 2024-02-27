import logging
from celery import shared_task

from .models import Feed
from chickens.models import Chicken
from notifications.signals import notify

logger = logging.getLogger(__name__)


@shared_task
def create_individual_feed_from_batch(pk):
    """_summary_

    Args:
        pk (int): Feed
    """
    try:
        feed = Feed.objects.get(pk=pk)

        if (feed.pen):
            chickens = Chicken.objects.filter(
                pen=feed.pen, hatchery=feed.hatchery).exclude(reduction_date__isnull=True)
        else:
            chickens = Chicken.objects.filter(
                hatchery=feed.hatchery).exclude(reduction_date__isnull=True)

        individual_weight = feed.weight/chickens.count() if chickens.count() != 0 else 0

        for chicken in chickens.iterator():
            created, feed = Feed.objects.update_or_create(week=feed.week, chicken=chicken, defaults={
                'formula': feed.formula,
                'weight': individual_weight,
                'parent': feed
            })

    except Exception as e:
        logger.error(
            "Error occured while creating individual feed from batch feed: {0}".format(
                e)
        )
        return
