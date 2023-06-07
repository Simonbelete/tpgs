from django.contrib import admin
from . import models


class IngredientAdmin(admin.ModelAdmin):
    fields = []


admin.site.register(models.Ingredient, IngredientAdmin)
admin.site.register(models.IngredientNutrient)
admin.site.register(models.IngredientType)
