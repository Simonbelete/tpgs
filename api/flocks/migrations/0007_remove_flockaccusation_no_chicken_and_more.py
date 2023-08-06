# Generated by Django 4.2 on 2023-08-06 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flocks', '0006_flockaccusation_note_flockreduction_reduction_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flockaccusation',
            name='no_chicken',
        ),
        migrations.RemoveField(
            model_name='flockreduction',
            name='no_chicken',
        ),
        migrations.RemoveField(
            model_name='historicalflockaccusation',
            name='no_chicken',
        ),
        migrations.AddField(
            model_name='flockaccusation',
            name='no_female_chickens',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='flockaccusation',
            name='no_male_chickens',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='flockreduction',
            name='no_female_chickens',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='flockreduction',
            name='no_male_chickens',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='historicalflockaccusation',
            name='no_female_chickens',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='historicalflockaccusation',
            name='no_male_chickens',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
