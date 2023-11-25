from rest_framework import serializers
from . import models
from units.serializers import UnitSerializer_GET
from users.serializers import UserSerializer_GET


class NutrientGroupSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.NutrientGroup
        fields = ['id', 'name', 'display_name', 'is_active', 'created_at']


class NutrientGroupSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.NutrientGroup
        fields = ['id', 'name', 'is_active']


class NutrientGroupHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_GET()

    class Meta:
        model = models.NutrientGroup.history.__dict__['model']
        fields = '__all__'


class NutrientSerializer_GET(serializers.ModelSerializer):
    nutrient_group = NutrientGroupSerializer_GET()
    unit = UnitSerializer_GET()

    class Meta:
        model = models.Nutrient
        fields = ['id', 'name', 'display_name', 'code', 'abbreviation', 'order',
                  'description', 'nutrient_group', 'unit', 'is_active', 'created_at']


class NutrientSerializer_SLUG(serializers.ModelSerializer):
    unit = serializers.SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = models.Nutrient
        fields = ['id', 'abbreviation', 'unit']


class NutrientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Nutrient
        fields = ['id', 'name', 'code', 'abbreviation',
                  'description', 'nutrient_group', 'unit', 'is_active']


class NutrientHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_GET()

    class Meta:
        model = models.Nutrient.history.__dict__['model']
        fields = '__all__'


class AllNutrientSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Nutrient
        fields = ['id', 'abbreviation', 'display_name']
