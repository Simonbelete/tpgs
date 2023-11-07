# Generated by Django 4.2 on 2023-11-03 10:35

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('breeds', '0005_historicalbreedweightguideline_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='BreedHDEPGuide',
            new_name='BreedHDEPGuideline',
        ),
        migrations.RenameModel(
            old_name='BreedHHEPGuide',
            new_name='BreedHHEPGuideline',
        ),
        migrations.RenameModel(
            old_name='HistoricalBreedHHEPGuide',
            new_name='HistoricalBreedHDEPGuideline',
        ),
        migrations.RenameModel(
            old_name='HistoricalBreedHDEPGuide',
            new_name='HistoricalBreedHHEPGuideline',
        ),
        migrations.AlterModelOptions(
            name='historicalbreedhdepguideline',
            options={'get_latest_by': ('history_date', 'history_id'), 'ordering': ('-history_date', '-history_id'), 'verbose_name': 'historical breed hdep guideline', 'verbose_name_plural': 'historical breed hdep guidelines'},
        ),
        migrations.AlterModelOptions(
            name='historicalbreedhhepguideline',
            options={'get_latest_by': ('history_date', 'history_id'), 'ordering': ('-history_date', '-history_id'), 'verbose_name': 'historical breed hhep guideline', 'verbose_name_plural': 'historical breed hhep guidelines'},
        ),
        migrations.RenameField(
            model_name='breedfeedguideline',
            old_name='feed',
            new_name='weight',
        ),
        migrations.RenameField(
            model_name='historicalbreedfeedguideline',
            old_name='feed',
            new_name='weight',
        ),
        migrations.RenameField(
            model_name='historicalbreedhdepguideline',
            old_name='hhep',
            new_name='hdep',
        ),
        migrations.RenameField(
            model_name='historicalbreedhhepguideline',
            old_name='hdep',
            new_name='hhep',
        ),
        migrations.AlterUniqueTogether(
            name='breedeggguideline',
            unique_together={('breed', 'week')},
        ),
        migrations.AlterUniqueTogether(
            name='breedfeedguideline',
            unique_together={('breed', 'week')},
        ),
        migrations.AlterUniqueTogether(
            name='breedhhepguideline',
            unique_together={('breed', 'week')},
        ),
        migrations.AlterUniqueTogether(
            name='breedweightguideline',
            unique_together={('breed', 'week')},
        ),
    ]