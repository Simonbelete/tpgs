from chickens.models import Chicken, Pedigree
from django_tenants.utils import get_tenant_model, schema_context


from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Build Pedigree'

    def handle(self, *args, **options):
        tenants = get_tenant_model().objects.all().filter(schema_name='test')

        for tenant in tenants.iterator():
            with schema_context(tenant):
                chic = Chicken.objects.all()
                print('***')
                print(chic)
                # for chicken in chickens.iterator():
                #     try:
                #         print('---------------')
                #         generation_count = 0
                #         sire = chicken.sire
                #         dam = chicken.dam
                #         while sire and dam:
                #             if (sire.sire == dam.sire or sire.dam == dam.dam):
                #                 generation_count += 1
                #                 sire = sire.sire
                #                 dam = dam.dam
                #             else:
                #                 # TODO: Logo error
                #                 break
                #         Pedigree.objects.update_or_create(
                #             target=chicken.id, source=chicken.sire, parent_type='sire', defaults={
                #                 'target': chicken.id, 'source': chicken.sire, 'parent_type': 'sire'
                #             })
                #         Pedigree.objects.update_or_create(
                #             target=chicken.id, source=chicken.sire, parent_type='dam', defaults={
                #                 'target': chicken.id, 'source': chicken.sire, 'parent_type': 'dam'
                #             })
                #         chicken.generation = generation_count
                #         chicken.save()
                # except Exception as ex:
                #     print(ex)
