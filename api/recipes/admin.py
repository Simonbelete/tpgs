from django.contrib import admin
from . import models


class RecipeAdmin(admin.ModelAdmin):
    fields = []


admin.site.register(models.Recipes, RecipeAdmin)
