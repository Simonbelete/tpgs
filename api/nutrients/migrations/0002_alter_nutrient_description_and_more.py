# Generated by Django 4.2 on 2023-06-06 13:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('units', '0001_initial'),
        ('nutrients', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nutrient',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='nutrient',
            name='nutrient_group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='nutrients', to='nutrients.nutrientgroup'),
        ),
        migrations.AlterField(
            model_name='nutrient',
            name='unit',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='nutrients', to='units.unit'),
        ),
    ]
