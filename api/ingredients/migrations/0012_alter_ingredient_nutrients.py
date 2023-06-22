# Generated by Django 4.2 on 2023-06-20 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nutrients', '0002_alter_nutrient_description_and_more'),
        ('ingredients', '0011_alter_ingredient_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='nutrients',
            field=models.ManyToManyField(blank=True, null=True, through='ingredients.IngredientNutrient', to='nutrients.nutrient'),
        ),
    ]
