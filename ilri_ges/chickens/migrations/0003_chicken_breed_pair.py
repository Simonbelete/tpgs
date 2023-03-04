# Generated by Django 4.1.7 on 2023-03-03 12:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('breeding_pairs', '0002_initial'),
        ('chickens', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chicken',
            name='breed_pair',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='breeding_pairs.breedpair'),
        ),
    ]