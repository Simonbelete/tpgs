from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from users.models import User


class Command(BaseCommand):
    help = 'populate permissions groups'

    def handle(self, *args, **options):
        models_list = [
            User
        ]
        farm_admin_group, created = Group.objects.get_or_create(
            name='farm admin')
        farmer_group, created = Group.objects.get_or_create(
            name='farmer')

        for model in models_list:
            content_type = ContentType.objects.get_for_model(model)
            post_permission = Permission.objects.filter(
                content_type=content_type)

            for perm in post_permission:
                if perm in ['add_', 'change_', 'view_']:
                    farmer_group.permissions.add(perm)

                # Set all permission to farm admin
                farm_admin_group.permissions.add(perm)

        self.stdout.write(self.style.SUCCESS(
            'Successfully Created Permissions and groups'))
