# Generated by Django 4.2 on 2024-03-15 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('import_export_job', '0006_exportjob_errors'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='exportjob',
            options={'ordering': ('-processing_initiated',)},
        ),
        migrations.AddField(
            model_name='exportjob',
            name='filter_dict',
            field=models.TextField(null=True, verbose_name='Dict of query parameters'),
        ),
    ]
