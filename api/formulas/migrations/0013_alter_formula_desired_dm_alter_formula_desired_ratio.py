# Generated by Django 4.2 on 2023-10-28 16:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formulas', '0012_alter_formularation_unique_together_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formula',
            name='desired_dm',
            field=models.DecimalField(blank=True, decimal_places=3, default=0, max_digits=15, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)]),
        ),
        migrations.AlterField(
            model_name='formula',
            name='desired_ratio',
            field=models.DecimalField(blank=True, decimal_places=3, default=100, max_digits=15, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)]),
        ),
    ]