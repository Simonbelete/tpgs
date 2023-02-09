from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from simple_history.admin import SimpleHistoryAdmin

from api import models

admin.site.register(models.User, UserAdmin)
admin.site.register(models.Country, SimpleHistoryAdmin)
