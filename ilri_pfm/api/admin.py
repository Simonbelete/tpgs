from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from simple_history.admin import SimpleHistoryAdmin

from api import models

admin.site.register(models.User, UserAdmin)
admin.site.register(models.Country, SimpleHistoryAdmin)
admin.site.register(models.City, SimpleHistoryAdmin)
admin.site.register(models.Farm, SimpleHistoryAdmin)
admin.site.register(models.House, SimpleHistoryAdmin)
admin.site.register(models.BreedType, SimpleHistoryAdmin)
admin.site.register(models.LayedPlace, SimpleHistoryAdmin)
admin.site.register(models.Chicken, SimpleHistoryAdmin)
admin.site.register(models.BreedPair, SimpleHistoryAdmin)
admin.site.register(models.Weight, SimpleHistoryAdmin)
admin.site.register(models.FeedType, SimpleHistoryAdmin)
admin.site.register(models.Feed, SimpleHistoryAdmin)
