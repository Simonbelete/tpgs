# Generated by Django 4.2 on 2024-02-20 10:32

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeds', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feed',
            name='week',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
        migrations.AlterField(
            model_name='historicalfeed',
            name='week',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]