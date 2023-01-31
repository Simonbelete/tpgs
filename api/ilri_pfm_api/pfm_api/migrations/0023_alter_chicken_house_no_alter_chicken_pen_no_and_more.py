# Generated by Django 4.1.5 on 2023-01-30 21:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pfm_api', '0022_remove_historicallayedplace_egg_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chicken',
            name='house_no',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='chicken',
            name='pen_no',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='egg',
            name='mother',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='pfm_api.chicken'),
        ),
        migrations.AlterField(
            model_name='historicalchicken',
            name='house_no',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='historicalchicken',
            name='pen_no',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]