from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from farms.models import Farm, Domain


class Command(BaseCommand):
    help = 'Create New Schema'

    def add_arguments(self, parser):
        parser.add_argument('tenant', type=str)

    def handle(self, *args, **options):
        tenant = Farm(schema_name=options['tenant'], name=options['tenant'])
        tenant.save()

        # domain = Domain()
        # domain.domain = '*'
        # domain.tenant = tenant
        # domain.save()
