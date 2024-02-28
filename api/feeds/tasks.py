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
    try:
        print('---------------------')
        feed = Feed.objects.get(pk=pk)

        # Filter out reduction_date is gretter than current week
        duration = ExpressionWrapper(
            F('reduction_date') - F('hatch_date'), output_field=DurationField())

        chickens = Chicken.objects.filter(
            hatchery=feed.hatchery).annotate(
                duration=duration)

        for c in chickens.iterator():
            print(c.tag, c.duration)

        chickens = chickens.filter(Q(duration__lt=timedelta(
            weeks=feed.week)) | Q(duration__isnull=True))

        print('**')
        for c in chickens.iterator():
            print(c.tag, c.duration)

        # if (feed.pen):
        #     chickens = chickens.filter(pen=feed.pen)

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
