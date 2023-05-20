# Generated by Django 4.2 on 2023-05-19 20:16

from django.db import migrations
import django.db.models.deletion
import django_multitenant.fields


class Migration(migrations.Migration):

    dependencies = [
        ('farms', '0002_farm_city_farm_country_farm_email_farm_phone_number_and_more'),
        ('users', '0003_alter_user_farm'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='farm',
            field=django_multitenant.fields.TenantForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='farms.farm'),
        ),
    ]
