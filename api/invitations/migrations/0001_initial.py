# Generated by Django 4.2 on 2023-06-30 14:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('email', models.EmailField(max_length=254)),
                ('sent_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('accepted', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('inviter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]