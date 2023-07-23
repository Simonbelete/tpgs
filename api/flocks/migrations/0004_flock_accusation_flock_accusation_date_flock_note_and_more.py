# Generated by Django 4.2 on 2023-07-23 11:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chickens', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accusation', '0001_initial'),
        ('flocks', '0003_flock_no_chickens_historicalflock_no_chickens'),
    ]

    operations = [
        migrations.AddField(
            model_name='flock',
            name='accusation',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='flocks', to='accusation.accusation'),
        ),
        migrations.AddField(
            model_name='flock',
            name='accusation_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='flock',
            name='note',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='historicalflock',
            name='accusation',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='accusation.accusation'),
        ),
        migrations.AddField(
            model_name='historicalflock',
            name='accusation_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='historicalflock',
            name='note',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='FlockReduction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('no_chickens', models.IntegerField(default=0)),
                ('chickens', models.ManyToManyField(blank=True, null=True, related_name='flock_reduction', to='chickens.chicken')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('flock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reductions', to='flocks.flock')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
