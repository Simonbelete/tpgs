from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from simple_history.admin import SimpleHistoryAdmin

from pfm_api.models import User, Farm

# admin.site.register(User, UserAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Farm, SimpleHistoryAdmin)