# Generated by Django 4.1.7 on 2023-03-01 15:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('breeds', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Flock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=250, unique=True)),
                ('hatch_date', models.DateField()),
                ('breed_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='flocks', to='breeds.breedtype')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
