# Generated by Django 4.1.7 on 2023-03-07 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeds', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feed',
            name='date',
        ),
        migrations.RemoveField(
            model_name='historicalfeed',
            name='date',
        ),
        migrations.AddField(
            model_name='feed',
            name='week',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='historicalfeed',
            name='week',
            field=models.IntegerField(default=0),
        ),
    ]
