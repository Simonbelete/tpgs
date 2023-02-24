from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from locations.models import City, Country, LayedPlace

admin.site.register(City, SimpleHistoryAdmin)
admin.site.register(Country, SimpleHistoryAdmin)
admin.site.register(LayedPlace, SimpleHistoryAdmin)
