from rest_framework import viewsets, status, views
from rest_framework.response import Response
import numpy as np

from users.models import User
from flocks.models import Flock
from farms.models import Farm
from chickens.models import Chicken
from eggs.models import Egg
from farms.api.serializers import FarmSerializer_GET_V1


class StaticsviewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer_GET_V1

    def list(self, request, *args, **kwargs):
        farms = Farm.objects.all()
        users = User.objects.filter(is_superuser=False)
        flocks = Flock.objects.all()
        chickens = Chicken.objects.all()

        farms_ids = request.GET.get('farms', "") or ""
        print('---------------')
        print(farms_ids == "")
        print(farms_ids == None)
        if len(farms_ids) != 0:
            farms_ids = np.array(farms_ids.split(',') or []).astype(int)

            farms = farms.filter(id__in=farms_ids)
            users = users.filter(farms__in=farms_ids)
            flocks = flocks.filter(farm__in=farms_ids)
            chickens = chickens.filter(farm__in=farms_ids)
        elif request.user.is_superuser != True:
            farms_ids = request.user.farms.all()

            farms = farms.filter(id__in=farms_ids)
            users = users.filter(farms__in=farms_ids)
            flocks = flocks.filter(farm__in=farms_ids)
            chickens = chickens.filter(farm__in=farms_ids)

        context = {
            'statics_count': {
                'users_count': users.count(),
                'flocks_count': flocks.count(),
                'farms_count': farms.count(),
                'chicken_count': chickens.count(),
            },
        }
        return Response(context)
