from django.core.management.base import BaseCommand
from django.core.management import call_command
import json
from django_tenants.utils import schema_context


class Command(BaseCommand):
    help = 'Create New Schema'

    def add_arguments(self, parser):
        parser.add_argument('tenant', type=str)
        parser.add_argument('fixture', type=str)

    def handle(self, *args, **options):
        with schema_context(options['tenant']):
            call_command('loaddata', options['fixture'],
                         app_label='FIXTURE')

            result = {'message': "Successfully"}
            return json.dumps(result)
