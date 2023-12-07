# Generated by Django 4.2 on 2023-12-07 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formulas', '0018_alter_formula_desired_dm_alter_formula_desired_ratio_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='formulaingredient',
            name='max',
            field=models.DecimalField(blank=True, decimal_places=3, default=0, max_digits=6, null=True),
        ),
        migrations.AddField(
            model_name='formulaingredient',
            name='min',
            field=models.DecimalField(blank=True, decimal_places=3, default=0, max_digits=6, null=True),
        ),
        migrations.AddField(
            model_name='historicalformulaingredient',
            name='max',
            field=models.DecimalField(blank=True, decimal_places=3, default=0, max_digits=6, null=True),
        ),
        migrations.AddField(
            model_name='historicalformulaingredient',
            name='min',
            field=models.DecimalField(blank=True, decimal_places=3, default=0, max_digits=6, null=True),
        ),
    ]
