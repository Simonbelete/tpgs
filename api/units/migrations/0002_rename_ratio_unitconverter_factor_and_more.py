# Generated by Django 4.2 on 2023-06-19 18:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('units', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='unitconverter',
            old_name='ratio',
            new_name='factor',
        ),
        migrations.AlterUniqueTogether(
            name='unitconverter',
            unique_together={('unit_from', 'unit_to')},
        ),
    ]
