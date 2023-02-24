from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from flocks.models import Flock

admin.site.register(Flock, SimpleHistoryAdmin)
