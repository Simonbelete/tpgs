from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from django.contrib.auth.admin import UserAdmin

from pfm_api.models import User

# admin.site.register(Farm, SimpleHistoryAdmin)
# admin.site.register(User)

admin.site.register(User, UserAdmin)