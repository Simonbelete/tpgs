# Generated by Django 4.2 on 2024-02-26 13:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('import_export_job', '0003_importjob_report'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='importjob',
            options={'ordering': ('-uploaded_on',)},
        ),
    ]
