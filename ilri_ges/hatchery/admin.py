from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import Hatchery, Incubation, Candling

# Register your models here.
admin.site.register(Hatchery, SimpleHistoryAdmin)
admin.site.register(Incubation, SimpleHistoryAdmin)
admin.site.register(Candling, SimpleHistoryAdmin)
