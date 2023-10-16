from django_filters import rest_framework as filters

from . import models


class ReductionReasonFilter(filters.FilterSet):
    class Meta:
        model = models.ReductionReason
        fields = ['is_active']
