# Generated by Django 4.1.5 on 2023-02-01 13:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pfm_api', '0023_alter_chicken_house_no_alter_chicken_pen_no_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='chicken',
            name='is_double_yolk',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='chicken',
            name='layed_place',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='pfm_api.layedplace'),
        ),
        migrations.AddField(
            model_name='chicken',
            name='sex',
            field=models.CharField(choices=[('F', 'Female'), ('M', 'Male')], default='M', max_length=1),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='is_double_yolk',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='layed_place',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='pfm_api.layedplace'),
        ),
        migrations.AddField(
            model_name='historicalchicken',
            name='sex',
            field=models.CharField(choices=[('F', 'Female'), ('M', 'Male')], default='M', max_length=1),
        ),
        migrations.CreateModel(
            name='ChickenProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('week', models.IntegerField(default=1)),
                ('weight', models.DecimalField(decimal_places=3, max_digits=6)),
                ('chicken', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='progress', to='pfm_api.chicken')),
                ('layed_eggs', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='pfm_api.chicken')),
            ],
        ),
    ]