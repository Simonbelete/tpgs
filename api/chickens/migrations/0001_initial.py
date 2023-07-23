# Generated by Django 4.2 on 2023-07-23 11:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Chicken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('tag', models.CharField(max_length=250, unique=True)),
                ('sex', models.CharField(blank=True, choices=[('F', 'Female'), ('M', 'Male')], default=None, max_length=1, null=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('dam', models.ForeignKey(blank=True, limit_choices_to={'sex', 'F'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children_of_dam', to='chickens.chicken')),
                ('sire', models.ForeignKey(blank=True, limit_choices_to={'M', 'sex'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children_of_sire', to='chickens.chicken')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='HistoricalChicken',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('created_at', models.DateTimeField(blank=True, editable=False, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('tag', models.CharField(db_index=True, max_length=250)),
                ('sex', models.CharField(blank=True, choices=[('F', 'Female'), ('M', 'Male')], default=None, max_length=1, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('created_by', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('dam', models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'sex', 'F'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='chickens.chicken')),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('sire', models.ForeignKey(blank=True, db_constraint=False, limit_choices_to={'M', 'sex'}, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='chickens.chicken')),
            ],
            options={
                'verbose_name': 'historical chicken',
                'verbose_name_plural': 'historical chickens',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]