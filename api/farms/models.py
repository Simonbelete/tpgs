import uuid
from django.db import models
from django_multitenant.models import TenantModel
from django_tenants.models import TenantMixin, DomainMixin
from simple_history.models import HistoricalRecords


class Farm(TenantModel, TenantMixin):
    tenant_name = models.CharField(max_length=100)
    tenant_uuid = models.UUIDField(default=uuid.uuid4, null=False, blank=False)
    # Primary identifier
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.CharField(max_length=20, null=True, blank=True)
    website = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    country = models.ForeignKey(
        'cities_light.Country', on_delete=models.SET_NULL, null=True, blank=True)
    city = models.ForeignKey(
        'cities_light.City', on_delete=models.SET_NULL, null=True, blank=True)
    history = HistoricalRecords()

    class TenantMeta:
        tenant_field_name = "id"

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    @property
    def display_name(self):
        return "{name} - {country}, {city}".format(
            name=self.name, 
            country=self.country.name if self.country else "-", 
            city=self.city.name if self.city else "-")


class Domain(DomainMixin):
    pass
