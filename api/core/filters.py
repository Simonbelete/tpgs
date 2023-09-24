from django_filters import rest_framework as filters

class CoreFilterSet(filters.FilterSet):
    is_active = filters.BooleanFilter(initial=True)

    def __init__(self, data=None, *args, **kwargs):
        if data is not None:
            data = data.copy()

            for name, f in self.base_filters.items():
                initial = f.extra.get('initial')

                # filter param is either missing or empty, use initial as default
                if not data.get(name) and initial:
                    data[name] = initial
        
        super().__init__(data, *args, **kwargs)
    
    class Meta:
        fields = ['is_active']