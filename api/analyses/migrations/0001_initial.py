# Generated by Django 4.2 on 2024-02-21 10:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('chickens', '0002_initial'),
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
                ('house_id', models.IntegerField()),
                ('house_name', models.TextField()),
                ('pen_id', models.IntegerField()),
                ('pen_name', models.TextField()),
                ('breed_id', models.IntegerField()),
                ('breed_name', models.TextField()),
                ('generation', models.TextField()),
            ],
            options={
                'db_table': 'directory_list',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ChickenRanking',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('feed_weight_total', models.DecimalField(
                    decimal_places=3, max_digits=19)),
                ('feed_weight_avg', models.DecimalField(
                    decimal_places=3, max_digits=19)),
                ('body_weight_total', models.DecimalField(
                    decimal_places=3, max_digits=19)),
                ('body_weight_avg', models.DecimalField(
                    decimal_places=3, max_digits=19)),
                ('egg_number_total', models.DecimalField(
                    decimal_places=3, max_digits=19)),
                ('egg_number_avg', models.DecimalFissseld(
                    decimal_places=3, max_digits=19)),
                ('egg_weight_total', models.DecimalField(
                    decimal_places=3, max_digits=19)),
                ('egg_weight_avg', models.DecimalField(
                    decimal_places=3, max_digits=19)),
                ('chicken', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='chickens.chicken')),
            ],
        ),
        migrations.RunSQL(
            """
            CREATE OR REPLACE VIEW chicken_ranking AS
               SELECT ww.chicken_id, ww.body_weight_avg, ww.body_weight_total,
                ff.feed_weight_avg, ff.feed_weight_total,
                ee.egg_number_avg, ee.egg_number_total, ee.egg_weight_avg, ee.egg_weight_total
                FROM 
                (
                    SELECT ww.chicken_id , AVG(ww.weight) AS body_weight_avg,
                        SUM(ww.weight) AS body_weight_total
                    FROM weights_weight ww
                    GROUP BY ww.chicken_id
                ) ww
                FULL OUTER JOIN 
                (
                    SELECT  ff.chicken_id, AVG(ff.weight) AS feed_weight_avg,
                        SUM(ff.weight) AS feed_weight_total
                    FROM feeds_feed ff 
                    WHERE chicken_id IS NOT NULL
                    GROUP BY ff.chicken_id
                ) ff ON ww.chicken_id = ff.chicken_id
                FULL OUTER JOIN 
                (
                    SELECT ee.chicken_id, AVG(ee.eggs) AS egg_number_avg, SUM(ee.eggs) AS egg_number_total,
                        AVG(ee.weight) AS egg_weight_avg, SUM(ee.weight) AS egg_weight_total
                    FROM eggs_egg ee 
                    GROUP BY ee.chicken_id
                ) ee ON ff.chicken_id = ee.chicken_id;
            """,
            """DROP VIEW chicken_ranking"""
        )js
    ]
