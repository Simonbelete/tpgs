from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class FormulaFilter(CoreFilterSet):
    class Meta:
        model = models.Formula
        fields = {
            'sex': ['exact']
        }
