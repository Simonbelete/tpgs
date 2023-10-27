from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel

class RequirementNutrient(CoreModel):
    requirement = models.ForeignKey('requirements.Requirement', on_delete=models.CASCADE)
    nutrient = models.ForeignKey(
        'nutrients.Nutrient', on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=7, decimal_places=3,null=True, blank=True, default=0)

class Requirement(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    nutrients = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=RequirementNutrient, related_name='requirement_nutrients')
    history = HistoricalRecords()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def display_name(self):
        return self.name
