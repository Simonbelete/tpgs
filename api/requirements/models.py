from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from core.validators import PERCENTAGE_VALIDATOR

class RequirementNutrient(CoreModel):
    requirement = models.ForeignKey('requirements.Requirement', on_delete=models.CASCADE)
    nutrient = models.ForeignKey(
        'nutrients.Nutrient', on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=7, decimal_places=3,null=True, blank=True, default=0)

    class Meta:
        ordering = ['nutrient']
        unique_together = ['requirement', 'nutrient']

class Requirement(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    nutrients = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=RequirementNutrient, related_name='requirement_nutrients')
    weight = models.DecimalField(max_digits=7, decimal_places=3,null=True, blank=True, default=0) #kg
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0) # per kg
    desired_ratio = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=15, decimal_places=3, default=100)
    desired_dm = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=15, decimal_places=3, default=0)
    history = HistoricalRecords()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def display_name(self):
        return self.name
    
    @property
    def nutrient_count(self):
        return self.nutrients.count()
