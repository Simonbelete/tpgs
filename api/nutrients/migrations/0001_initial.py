# Generated by Django 4.2 on 2023-06-02 10:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('units', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='NutrientGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Nutrient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('code', models.CharField(blank=True, max_length=100, null=True)),
                ('abbreviation', models.CharField(max_length=10, unique=True)),
                ('description', models.TextField()),
                ('nutrient_group', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='nutrients', to='nutrients.nutrientgroup')),
                ('unit', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='nutrients', to='units.unit')),
            ],
        ),
    ]
