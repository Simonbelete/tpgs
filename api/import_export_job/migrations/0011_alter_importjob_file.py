# Generated by Django 4.2 on 2024-04-11 10:46

from django.db import migrations, models
import import_export_job.models


class Migration(migrations.Migration):

    dependencies = [
        ('import_export_job', '0010_alter_importjob_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='importjob',
            name='file',
            field=models.FileField(storage=import_export_job.models.select_storage, upload_to=''),
        ),
    ]
