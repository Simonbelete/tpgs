# Generated by Django 4.2 on 2023-05-04 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipes',
            name='description',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
