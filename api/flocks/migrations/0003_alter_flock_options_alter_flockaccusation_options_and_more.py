# Generated by Django 4.2 on 2024-03-11 08:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flocks', '0002_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='flock',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterModelOptions(
            name='flockaccusation',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterModelOptions(
            name='flockreduction',
            options={'ordering': ['-created_at']},
        ),
    ]
