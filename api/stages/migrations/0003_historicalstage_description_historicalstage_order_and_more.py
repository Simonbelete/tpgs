# Generated by Django 4.2 on 2024-02-20 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stages', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalstage',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='historicalstage',
            name='order',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='stage',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stage',
            name='order',
            field=models.PositiveIntegerField(default=0, unique=True),
        ),
        migrations.AlterField(
            model_name='historicalstage',
            name='max_week',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='historicalstage',
            name='min_week',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stage',
            name='max_week',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stage',
            name='min_week',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
