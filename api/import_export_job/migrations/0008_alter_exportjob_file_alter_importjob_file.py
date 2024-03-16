# Generated by Django 4.2 on 2024-03-15 20:39

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('import_export_job', '0007_alter_exportjob_options_exportjob_filter_dict'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exportjob',
            name='file',
            field=models.FileField(storage=django.core.files.storage.FileSystemStorage(location='apidata/exportdata'), upload_to=''),
        ),
        migrations.AlterField(
            model_name='importjob',
            name='file',
            field=models.FileField(storage=django.core.files.storage.FileSystemStorage(location='apidata/importdata'), upload_to=''),
        ),
    ]