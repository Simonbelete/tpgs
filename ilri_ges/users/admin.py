from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group, Permission

from .models import User

admin.site.register(User, SimpleHistoryAdmin)
admin.site.register(Permission)
