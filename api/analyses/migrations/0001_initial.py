# Generated by Django 4.2 on 2023-08-05 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DirectoryList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('farm_id', models.IntegerField()),
                ('flock_id', models.IntegerField()),
                ('house_id', models.IntegerField()),
            ],
            options={
                'db_table': 'directory_list',
                'managed': False,
            },
        ),
    ]