# Generated by Django 4.2 on 2023-07-27 18:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chickens', '0002_remove_chicken_dam_remove_chicken_sire_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='chicken',
            name='dam',
            field=models.ForeignKey(blank=True, limit_choices_to={'sex': 'F'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children_of_dam', to='chickens.chicken'),
        ),
        migrations.AddField(
            model_name='chicken',
            name='sire',
            field=models.ForeignKey(blank=True, limit_choices_to={'sex': 'M'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children_of_sire', to='chickens.chicken'),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='dam',
            field=models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'sex': 'F'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='chickens.chicken'),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='sire',
            field=models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'sex': 'M'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='chickens.chicken'),
        ),
    ]
