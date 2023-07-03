from django.contrib import admin
from import_export import resources

from . import models


class FlockResource(resources.ModelResource):
    class Meta:
        model = models.Flock
