# Generated by Django 4.1.5 on 2023-01-27 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pfm_api', '0015_farm'),
    ]

    operations = [
        migrations.AddField(
            model_name='farm',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]