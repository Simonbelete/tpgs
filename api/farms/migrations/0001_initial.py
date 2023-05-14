# Generated by Django 4.2 on 2023-05-14 08:15

from django.db import migrations, models
import django_multitenant.mixins
import django_multitenant.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Farm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=255)),
            ],
            options={
                'ordering': ['name'],
            },
            bases=(django_multitenant.mixins.TenantModelMixin, models.Model),
            managers=[
                ('objects', django_multitenant.models.TenantManager()),
            ],
        ),
    ]
