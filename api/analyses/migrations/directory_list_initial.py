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
                ('hatchery_id', models.IntegerField()),
                ('hatchery_name', models.TextField()),
                ('generation', models.TextField()),
                ('house_id', models.IntegerField()),
                ('house_name', models.TextField()),
                ('breed_id', models.IntegerField()),
                ('breed_name', models.TextField()),
            ],
            options={
                'db_table': 'directory_list',
                'managed': False,
            },
        ),

        # Add your schemas here
        migrations.RunSQL(
            """
            CREATE sequence IF NOT EXISTS directory_list_seq CYCLE;

            CREATE MATERIALIZED VIEW directory_list AS 

                -- scheam_name = test

                (SELECT nextval('directory_list_seq'::regclass) AS unique_id, 
                    ff.schema_name AS farm_name, ff.id AS farm_id,
                	hh2.name AS hatchery_name, hh2.id AS hatchery_id,
                	hh.name as house_name, hh.id AS house_id,
                    pp.name as pen_name, pp.id AS pen_id,
                    cc.generation,
                    bb.id AS breed_id, bb.name AS breed_name
                FROM farms_farm ff
                CROSS JOIN
                    test.hatchery_hatchery hh2, 
                    test.houses_house hh,
                    test.pen_pen pp,
                    test.breeds_breed bb,
                    (select distinct(generation) from test.chickens_chicken) cc
                WHERE ff.schema_name = 'test'
                    AND hh2.is_active = true 
                	AND hh.is_active = true
                	AND pp.is_active = true
                )

                UNION ALL

                -- schema_name = ilri_eth

                (SELECT nextval('directory_list_seq'::regclass) AS unique_id, 
                    ff.schema_name AS farm_name, ff.id AS farm_id,
                	hh2.name AS hatchery_name, hh2.id AS hatchery_id,
                	hh.name as house_name, hh.id AS house_id,
                    pp.name as pen_name, pp.id AS pen_id,
                    cc.generation,
                    bb.id AS breed_id, bb.name AS breed_name
                FROM farms_farm ff
                CROSS JOIN
                    ilri_eth.hatchery_hatchery hh2, 
                    ilri_eth.houses_house hh,
                    ilri_eth.pen_pen pp,
                    ilri_eth.breeds_breed bb,
                    (select distinct(generation) from ilri_eth.chickens_chicken) cc
                WHERE ff.schema_name = 'ilri_eth'
                    AND hh2.is_active = true 
                	AND hh.is_active = true
                	AND pp.is_active = true
                );
                

                CREATE UNIQUE INDEX ON directory_list(unique_id);
            """,
            """DROP MATERIALIZED VIEW directory_list"""
        )
    ]
