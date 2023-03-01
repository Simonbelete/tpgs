# Generated by Django 4.1.7 on 2023-02-24 14:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('breeds', '0001_initial'),
        ('farms', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Flock',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=250, unique=True)),
                ('hatch_date', models.DateField()),
                ('breed_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL,
                 related_name='flocks', to='breeds.breedtype')),
                ('created_by', models.ForeignKey(
                    on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('farm', models.ForeignKey(
                    null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='flock', to='farms.farm')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
