from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from farms.models import Farm

admin.site.register(Farm, SimpleHistoryAdmin)
