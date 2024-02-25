from celery import shared_task
from chickens.models import Chicken, Pedigree
from django_tenants.utils import get_tenant_model, schema_context

from feeds.models import Feed
from eggs.models import Egg
from weights.models import Weight

# @shared_task


def build_pedigree_tree():
    chickens = Chicken.objects.all()
    print('Here')
    print(chickens)
    for chicken in chickens.iterator():

        try:
            generation_count = 0
            sire = chicken.sire
            dam = chicken.dam
            print(sire)
            print(dam)

            while sire and dam:
                generation_count += 1
                sire = sire.sire
                dam = dam.dam
                # if (sire.sire == dam.sire or sire.dam == dam.dam):

            if (chicken.sire):
                Pedigree.objects.update_or_create(
                    target=chicken, source=chicken.sire, parent_type='sire', defaults={
                        'target': chicken, 'source': chicken.sire, 'parent_type': 'sire'
                    })
            if (chicken.dam):
                Pedigree.objects.update_or_create(
                    target=chicken, source=chicken.dam, parent_type='dam', defaults={
                        'target': chicken, 'source': chicken.dam, 'parent_type': 'dam'
                    })

            print(generation_count)

            chicken.generation = generation_count
            chicken.save()
        except Exception as ex:
            print(ex)

    # tenants = get_tenant_model().objects.all()

    # for tenant in tenants.iterator():
    #     with schema_context(tenant):
    #         chickens = Chicken.objects.all()
    #         for chicken in chickens.iterator():
    #             try:
    #                 generation_count = 0
    #                 sire = chicken.sire
    #                 dam = chicken.dam
    #                 while sire and dam:
    #                     if (sire.sire == dam.sire or sire.dam == dam.dam):
    #                         generation_count += 1
    #                         sire = sire.sire
    #                         dam = dam.dam
    #                     else:
    #                         # TODO: Logo error
    #                         break
    #                 Pedigree.objects.update_or_create(
    #                     target=chicken.id, source=chicken.sire, parent_type='sire', defaults={
    #                         'target': chicken.id, 'source': chicken.sire, 'parent_type': 'sire'
    #                     })
    #                 Pedigree.objects.update_or_create(
    #                     target=chicken.id, source=chicken.sire, parent_type='dam', defaults={
    #                         'target': chicken.id, 'source': chicken.sire, 'parent_type': 'dam'
    #                     })
    #                 chicken.generation = generation_count
    #                 chicken.save()
    #             except Exception as ex:
    #                 print(ex)


@shared_task
def archive_resources(instance):
    """Arhcive Egg, Feed & Weight

    Args:
        instance Chicken: 
    """
    feeds = Feed.objects.exclude(parent__isnull=True).filter(
        chicken=instance.id).update(is_active=False)
    eggs = Egg.objects.filter(chicken=instance.id).update(is_active=False)
    weights = Weight.objects.filter(
        chicken=instance.id).update(is_active=False)


@shared_task
def unarchive_resources(instance):
    """Arhcive Egg, Feed & Weight

    Args:
        instance Chicken: 
    """
    feeds = Feed.objects.exclude(parent__isnull=True).filter(
        chicken=instance.id).update(is_active=True)
    eggs = Egg.objects.filter(chicken=instance.id).update(is_active=True)
    weights = Weight.objects.filter(
        chicken=instance.id).update(is_active=True)


@shared_task
def import_weekly_weights(df):
    columns = df.columns
    col_filter = "((W|w)eek(\s)?)[0-9]+"
    for index, row in df.iterrows():
        for col in columns:
            week_num = col.lower().split('week')[1]
            Weight.objects.update_or_create(chicken__tag=row['tag'], week=week_num, defaults={
                'weight': row[col]})
