# Generated by Django 4.2 on 2023-08-09 14:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('farms', '0002_historicalfarm'),
        ('invitations', '0002_alter_invitation_expire_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='invitation',
            name='farms',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='farms.farm'),
            preserve_default=False,
        ),
    ]