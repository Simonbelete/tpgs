# Generated by Django 4.2 on 2024-01-20 20:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('breeds', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalbreedweightguideline',
            name='created_by',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreedweightguideline',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreedhhepguideline',
            name='breed',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='historicalbreedhhepguideline',
            name='created_by',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreedhhepguideline',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreedhdepguideline',
            name='breed',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='historicalbreedhdepguideline',
            name='created_by',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreedhdepguideline',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreedfeedguideline',
            name='breed',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='historicalbreedfeedguideline',
            name='created_by',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreedfeedguideline',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreedeggguideline',
            name='breed',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='historicalbreedeggguideline',
            name='created_by',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreedeggguideline',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreed',
            name='created_by',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalbreed',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='breedweightguideline',
            name='breed',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='breedweightguideline',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='breedhhepguideline',
            name='breed',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='breedhhepguideline',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='breedhdepguideline',
            name='breed',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='breedhdepguideline',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='breedfeedguideline',
            name='breed',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='breedfeedguideline',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='breedeggguideline',
            name='breed',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='breeds.breed'),
        ),
        migrations.AddField(
            model_name='breedeggguideline',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='breed',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='breedweightguideline',
            unique_together={('breed', 'week')},
        ),
        migrations.AlterUniqueTogether(
            name='breedhhepguideline',
            unique_together={('breed', 'week')},
        ),
        migrations.AlterUniqueTogether(
            name='breedhdepguideline',
            unique_together={('breed', 'week')},
        ),
        migrations.AlterUniqueTogether(
            name='breedfeedguideline',
            unique_together={('breed', 'week')},
        ),
        migrations.AlterUniqueTogether(
            name='breedeggguideline',
            unique_together={('breed', 'week')},
        ),
    ]
