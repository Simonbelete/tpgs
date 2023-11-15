from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from users.models import User
from houses.models import House


class Command(BaseCommand):
    help = 'Create Groups'

    def handle(self, *args, **options):
        # models_list = [
        #     User,
        #     House,
        # ]
        farm_admin_group, farm_admin_created = Group.objects.get_or_create(
            name='farm admin')
        farmer_group, farmer_created = Group.objects.get_or_create(
            name='farmer')

        # for model in models_list:
        #     content_type = ContentType.objects.get_for_model(model)
        #     post_permission = Permission.objects.filter(
        #         content_type=content_type)

        #     for perm in post_permission:
        #         print(perm.codename)
        #         if 'add_' in perm.codename or 'change_' in perm.codename or 'view_' in perm.codename:
        #             farmer_group.permissions.add(perm)

        #         # Set all permission to farm admin
        #         farm_admin_group.permissions.add(perm)

        post_permission = Permission.objects.all()

        for perm in post_permission:
            print(perm.codename)
            if 'add_' in perm.codename or 'change_' in perm.codename or 'view_' in perm.codename:
                farmer_group.permissions.add(perm)

            # Set all permission to farm admin
            farm_admin_group.permissions.add(perm)

        self.stdout.write(self.style.SUCCESS(
            'Successfully Created Permissions and groups'))
