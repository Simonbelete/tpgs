from django_multitenant.utils import set_current_tenant

from farms.models import Farm


class MultitenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # if request.user and not request.user.is_anonymous:
        #     farms = request.user.farms
        #     if request.user.is_superuser:
        #         try:
        #             farm_id = request.headers['x-FARM-ID']
        #             farm = Farm.objects.get(pk=farm_id)
        #         except:
        #             pass
        #     set_current_tenant(farm)
        return self.get_response(request)
