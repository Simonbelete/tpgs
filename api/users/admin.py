from django.contrib import admin
from django.contrib.auth.models import Group, Permission

from . import models

admin.site.register(models.User)
admin.site.register(Permission)
