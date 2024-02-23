from celery import shared_task
from hatchery.models import Hatchery
from chickens.models import Chicken
from django_tenants.utils import tenant_context


def sync_hatchery_to_chicken(hatchery):
    """"Update Chicken detail from hatchery staging"""
    # with tenant_context(farm):
    # hatchery = Hatchery.all.get(pk=hatchery_id)
    ids = list(zip(*hatchery.selected_chickens.values_list('id')))
    ids = ids if len(ids) == 0 else ids[0]
    selected_chickens = Chicken.objects.filter(pk__in=ids)
    selected_chickens.bulk_update(
        hatchery=hatchery, generation=hatchery.generation)


def unsync_hatchery_from_chicken(hatchery):
    ids = list(zip(*hatchery.selected_chickens.values_list('id')))
    ids = ids if len(ids) == 0 else ids[0]
    selected_chickens = Chicken.objects.filter(pk__in=ids)
    selected_chickens.bulk_update(
        hatchery=None, generation=None)
