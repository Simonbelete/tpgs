from django.db import models
from django_multitenant.models import TenantModel

class Farm(TenantModel):
    name =  models.CharField(max_length=50)
    address = models.CharField(max_length=255)

    class TenantMeta:
        tenant_field_name = "id"

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
