from datetime import date
from django.core.exceptions import ObjectDoesNotExist
from django_tenants.middleware import TenantMainMiddleware
from django.conf import settings
from django.core.exceptions import DisallowedHost
from django.db import connection
from django.http import Http404
from django.urls import set_urlconf
from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden
from rest_framework.authentication import TokenAuthentication

from django_tenants.utils import get_tenant_model, get_tenant_domain_model

from users.models import User


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
            return HttpResponse(JsonResponse({'error': 'No Farm found under that name'}), status=404)

        # Check If User have access to the requested farm
        try:
            if (not request.user.is_anonymous and not request.user.is_superuser):
                User.objects.get(
                    pk=request.user.id, farms__in=[tenant.id])
        except User.DoesNotExist:
            return HttpResponseForbidden(JsonResponse({'error': 'Unauthorized'}))

        tenant.domain_url = requested_farm
        request.tenant = tenant
        request.tenant_model = tenant_model
        connection.set_tenant(request.tenant)
