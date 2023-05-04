from django.contrib import admin
from . import models


class RationIngredientAdmin(admin.TabularInline):
    model = models.RationIngredient


class RationAdmin(admin.ModelAdmin):
    fields = []
    inlines = [RationIngredientAdmin]


admin.site.register(models.Ration, RationAdmin)
