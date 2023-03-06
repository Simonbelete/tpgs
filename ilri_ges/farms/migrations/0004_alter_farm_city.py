# Generated by Django 4.1.7 on 2023-03-06 19:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0003_historicalcountry'),
        ('farms', '0003_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='farm',
            name='city',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='farms', to='locations.city'),
        ),
    ]
