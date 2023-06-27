def multi_farm_from_request(request, object):
    if request.user and not request.user.is_anonymous:
        return object.filter(farms_in=request.user.farms)
    else:
        # Public Farm
        return object.filter(farms_in=[1])


def farm_from_request(request, object):
    if request.user and not request.user.is_anonymous:
        return object.filter(farm__in=request.user.farms)
    else:
        # Public Farm
        return object.filter(farm__in=[1])
