import logging
from celery import shared_task
from django.db.models import Q, F, ExpressionWrapper, DurationField
from datetime import timedelta
from django_tenants.utils import tenant_context

from .models import Feed
from chickens.models import Chicken
from notifications.signals import notify
from farms.models import Farm


logger = logging.getLogger(__name__)


def _create_individual_feed_from_batch(pk):
    """_summary_

    Args:
        pk (int): Feed
    """
    # try:

    # except Exception as e:
    #     print(e)
    #     logger.error(
    #         "Error occured while creating individual feed from batch feed: {0}".format(
    #             e)
    #     )
    #     return

    feed = Feed.objects.get(pk=pk)

    # Filter out reduction_date is gretter than current week
    duration = ExpressionWrapper(
        F('reduction_date') - F('hatch_date'), output_field=DurationField())

    chickens = Chicken.objects.filter(
        hatchery=feed.hatchery)

    if (feed.pen):
        chickens = chickens.filter(pen=feed.pen)

    # Remove previously created individual weights
    chicken_ids = chickens.values_list('id', flat=True)
    previous_feeds = Feed.objects.filter(
        chicken__in=chicken_ids, week=feed.week).delete()

    chickens = chickens.annotate(
        duration=duration).filter(
        (
            Q(duration__gte=timedelta(days=0)) &
            Q(duration__gt=timedelta(weeks=feed.week))
        ) |
        Q(duration__isnull=True))

    individual_weight = feed.weight/chickens.count() if chickens.count() != 0 else 0

    for c in chickens.iterator():
        print(c.tag, individual_weight)
        Feed.objects.update_or_create(
            week=feed.week,
            chicken=c,
            defaults={
                'chicken': c,
                'week': feed.week,
                'weight': individual_weight,
                'formula': feed.formula,
                'parent': feed
            }
        )


@shared_task
def create_individual_feed_from_batch(pk):
    """_summary_

    Args:
        pk (int): Feed
    """
    _create_individual_feed_from_batch(pk)
    # farm = Farm.objects.get(pk=farm_pk)
    # with tenant_context(farm):
    #     try:
    #         _create_individual_feed_from_batch(pk)
    #     except Exception as e:
    #         logger.error(
    #             "Some error occurred while deleting ImportJob file: {0}".format(
    #                 e)
    #         )
    #         return
