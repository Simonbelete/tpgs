from django_filters import rest_framework as filters

from . import models


class UserFilter(filters.FilterSet):
    class Meta:
        model = models.User
        fields = ['is_active']
