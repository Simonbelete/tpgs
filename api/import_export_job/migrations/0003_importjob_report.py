# Generated by Django 4.2 on 2024-02-25 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('import_export_job', '0002_importjob_created_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='importjob',
            name='report',
            field=models.TextField(blank=True, default='', verbose_name='HTML rendered report'),
        ),
    ]
