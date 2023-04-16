from django.db import models
from core.models import CoreModel

class Nutrients(CoreModel):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=100, unique=True)
