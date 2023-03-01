from rest_framework import serializers

from chickens.models import Chicken


class ChickenSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = Chicken
        fields = ['name', 'age', 'hatch_weight', 'flock', 'id', 'tag', 'sex', 'farm',
                  'house', 'breed_type', 'layed_place', 'is_double_yolk', 'hatch_date', 'created_at']
