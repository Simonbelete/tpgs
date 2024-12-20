# Generated by Django 4.1.7 on 2023-03-14 08:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('breeds', '0002_initial'),
        ('flocks', '0003_historicalflock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flock',
            name='breed_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='flocks', to='breeds.breedtype'),
        ),
        migrations.AlterField(
            model_name='flock',
            name='hatch_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='historicalflock',
            name='hatch_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
