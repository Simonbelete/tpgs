from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from breeds.models import BreedType

admin.site.register(BreedType, SimpleHistoryAdmin)
