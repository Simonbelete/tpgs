# Generated by Django 4.2 on 2023-10-13 10:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nutrients', '0003_nutrientgroup_created_at_nutrientgroup_created_by_and_more'),
        ('formulas', '0011_remove_formula_weight_unit'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='formularation',
            unique_together={('formula', 'nutrient')},
        ),
        migrations.AlterUniqueTogether(
            name='formularequirement',
            unique_together={('formula', 'nutrient')},
        ),
    ]