# Generated by Django 4.2 on 2023-07-31 06:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('units', '0002_rename_ratio_unitconverter_factor_and_more'),
        ('formulas', '0003_formulaingredient_result_formulaingredient_value_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='formulaingredient',
            old_name='result',
            new_name='ration',
        ),
        migrations.RemoveField(
            model_name='formulaingredient',
            name='value',
        ),
        migrations.AddField(
            model_name='formula',
            name='weight_unit',
            field=models.ForeignKey(blank=True, default=3, null=True, on_delete=django.db.models.deletion.SET_NULL, to='units.unit'),
        ),
        migrations.AlterField(
            model_name='formula',
            name='weight',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]