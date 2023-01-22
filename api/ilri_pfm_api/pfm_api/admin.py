from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from pfm_api.models import Farm

admin.site.register(Farm, SimpleHistoryAdmin)
