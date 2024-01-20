# Generated by Django 4.2 on 2024-01-20 20:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pen', '0001_initial'),
        ('chickens', '0001_initial'),
        ('reduction_reason', '0001_initial'),
        ('breeds', '0002_initial'),
        ('hatchery', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalchicken',
            name='created_by',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='dam',
            field=models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'sex': 'F'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='chickens.chicken'),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='hatchery',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='hatchery.hatchery'),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='pen',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='pen.pen'),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='reduction_reason',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='reduction_reason.reductionreason'),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='sire',
            field=models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'sex': 'M'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='chickens.chicken'),
        ),
        migrations.AddField(
            model_name='chicken',
            name='breed',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='chicken',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chicken',
            name='dam',
            field=models.ForeignKey(blank=True, limit_choices_to={'sex': 'F'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children_of_dam', to='chickens.chicken'),
        ),
        migrations.AddField(
            model_name='chicken',
            name='hatchery',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='chickens', to='hatchery.hatchery'),
        ),
        migrations.AddField(
            model_name='chicken',
            name='pen',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='chickens', to='pen.pen'),
        ),
        migrations.AddField(
            model_name='chicken',
            name='reduction_reason',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='chickens', to='reduction_reason.reductionreason'),
        ),
        migrations.AddField(
            model_name='chicken',
            name='sire',
            field=models.ForeignKey(blank=True, limit_choices_to={'sex': 'M'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children_of_sire', to='chickens.chicken'),
        ),
    ]
