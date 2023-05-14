from django_multitenant.utils import set_current_tenant

from farms.models import Farm

class MultitenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user and not request.user.is_anonymous:
            farm = request.user.farm
            if request.user.is_superuser:
                farm_id = request.headers['x-FARM-ID']
                try:
                    farm = Farm.objects.get(pk=farm_id)
                except:
                    pass
            set_current_tenant(farm)
        return self.get_response(request)