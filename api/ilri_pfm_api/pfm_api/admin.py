from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from simple_history.admin import SimpleHistoryAdmin

from pfm_api.models import User, Device,Farm, ChickenParent, Chicken, ChickenProgress, BreedType, ChickenStage, Egg, LayedPlace

# admin.site.register(User, UserAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Device)
admin.site.register(Farm, SimpleHistoryAdmin)
admin.site.register(ChickenParent, SimpleHistoryAdmin)
admin.site.register(Chicken, SimpleHistoryAdmin)
admin.site.register(ChickenProgress)
admin.site.register(BreedType, SimpleHistoryAdmin)
admin.site.register(ChickenStage, SimpleHistoryAdmin)
admin.site.register(Egg, SimpleHistoryAdmin)
admin.site.register(LayedPlace, SimpleHistoryAdmin)