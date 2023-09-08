from django_filters import rest_framework as filters

from . import models

class InvitationFilter(filters.FilterSet):
    class Meta:
        model = models.Invitation
        fields = {
            'accepted': ['in', 'exact']
        }
