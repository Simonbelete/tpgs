# Generated by Django 4.2 on 2023-08-05 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DirectoryList',
            fields=[
                ('unique_id', models.CharField(
                    max_length=255, primary_key=True, serialize=False)),
                ('farm_name', models.TextField()),
                ('farm_id', models.IntegerField()),
                ('flock_id', models.IntegerField()),
                ('flock_name', models.TextField()),
                ('house_id', models.IntegerField()),
                ('house_name', models.TextField()),
            ],
            options={
                'db_table': 'directory_list',
                'managed': False,
            },
        ),

        migrations.RunSQL(
            """
            CREATE MATERIALIZED VIEW directory_list AS 
                SELECT concat(ff.id, ff2.id, hh.id) AS unique_id, 
                    ff.schema_name AS farm_name, ff.id AS farm_id, 
                	ff2.name AS flock_name, ff2.id AS flock_id,
                	hh.name as house_name, hh.id AS house_id
                FROM farms_farm ff
                CROSS JOIN test.flocks_flock ff2, test.houses_house hh;

                CREATE UNIQUE INDEX ON directory_list(unique_id);
            """,
            """DROP VIEW directory_list"""
        )
    ]