# Generated by Django 4.2 on 2023-11-21 17:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('formulas', '0015_formula_unit_price_historicalformula_unit_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='formulaingredient',
            name='ratio_max',
        ),
        migrations.RemoveField(
            model_name='formulaingredient',
            name='ratio_min',
        ),
        migrations.RemoveField(
            model_name='historicalformulaingredient',
            name='ratio_max',
        ),
        migrations.RemoveField(
            model_name='historicalformulaingredient',
            name='ratio_min',
        ),
    ]