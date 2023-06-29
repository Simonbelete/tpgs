from datetime import date
from django.core.exceptions import ObjectDoesNotExist
from django_tenants.middleware import TenantMainMiddleware
from django.conf import settings
from django.core.exceptions import DisallowedHost
from django.db import connection
from django.http import Http404
from django.urls import set_urlconf
from django.utils.deprecation import MiddlewareMixin

from django_tenants.utils import get_tenant_model, get_tenant_domain_model

from users.models import User


class RequestIDTenantMiddleware(TenantMainMiddleware):
    @staticmethod
    def hostname_from_request(request):
        """ Extracts hostname from request. Used for custom requests filtering.
            By default removes the request's port and common prefixes.
        """
        return request.headers.get('X-Request-Id', 'public')
        # return remove_www(request.get_host().split(':')[0])


class FarmMiddleware(TenantMainMiddleware):
    @staticmethod
    def hostname_from_request(request):
        """ Extracts hostname from request. Used for custom requests filtering.
            By default removes the request's port and common prefixes.
        """
        return request.headers.get('X-Request-Id', 'public')

    def process_request(self, request):
        # Connection needs first to be at the public schema, as this is where
        # the tenant metadata is stored.

        # Use users avaliable farms

        print('---------------------------')

        connection.set_schema_to_public()
        try:
            requested_farm = self.hostname_from_request(request)
        except DisallowedHost:
            from django.http import HttpResponseNotFound
            return HttpResponseNotFound()

        domain_model = get_tenant_domain_model()
        tenant_model = get_tenant_model()

        try:
            tenant = tenant_model.objects.get(schema_name=requested_farm)
        except tenant_model.DoesNotExist:
            self.no_tenant_found(request, requested_farm)
            return

        # Check If User have access to the requested farm
        try:
            if (not request.user.is_anonymous and not request.user.is_superuser):
                User.objects.get(
                    pk=request.user, farms__in=[tenant.id])
        except User.DoesNotExist:
            self.no_tenant_found(request, requested_farm + "-Unauthorized")
            return

        tenant.domain_url = requested_farm
        request.tenant = tenant
        print('------')
        print(request.tenant)
        connection.set_tenant(request.tenant)
