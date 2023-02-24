from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from chickens.models import Chicken

admin.site.register(Chicken, SimpleHistoryAdmin)
