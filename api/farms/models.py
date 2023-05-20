from django.db import models
from django_multitenant.models import TenantModel


class Farm(TenantModel):
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.CharField(max_length=20, null=True, blank=True)
    website = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    country = models.ForeignKey(
        'cities_light.Country', on_delete=models.SET_NULL, null=True, blank=True)
    city = models.ForeignKey(
        'cities_light.City', on_delete=models.SET_NULL, null=True, blank=True)

    class TenantMeta:
        tenant_field_name = "id"

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
