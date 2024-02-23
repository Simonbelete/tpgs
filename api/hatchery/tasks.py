from celery import shared_task
from hatchery.models import Hatchery
from chickens.models import Chicken
from django_tenants.utils import tenant_context


@shared_task
def sync_selected_chickens(hatchery):
    """"Update Chicken detail from hatchery staging"""
    # with tenant_context(farm):
    # hatchery = Hatchery.all.get(pk=hatchery_id)
    ids = list(zip(*hatchery.selected_chickens.values_list('id')))
    ids = ids if len(ids) == 0 else ids[0]
    selected_chickens = Chicken.objects.filter(pk__in=ids)
    selected_chickens.bulk_update(
        hatchery=hatchery, generation=hatchery.generation)


@shared_task
def unsync_selected_chickens(hatchery):
    ids = list(zip(*hatchery.selected_chickens.values_list('id')))
    ids = ids if len(ids) == 0 else ids[0]
    selected_chickens = Chicken.objects.filter(pk__in=ids)
    selected_chickens.bulk_update(
        hatchery=None, generation=None)


@shared_task
def sync_unselected_chickens(hatchery):
    ids = list(zip(*hatchery.unselected_chickens.values_list('id')))
    ids = ids if len(ids) == 0 else ids[0]
    selected_chickens = Chicken.objects.filter(pk__in=ids)
    selected_chickens.bulk_update(
        reduction_reason=hatchery.reduction_reason, reduction_date=hatchery.reduction_date)


@shared_task
def unsync_unselected_chickens(hatchery):
    ids = list(zip(*hatchery.selected_chickens.values_list('id')))
    ids = ids if len(ids) == 0 else ids[0]
    selected_chickens = Chicken.objects.filter(pk__in=ids)
    selected_chickens.bulk_update(
        hatchery=None, generation=None, reduction_reason=None, reduction_date=None)
