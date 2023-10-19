from rest_framework import serializers

from . import models

class BreedSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Breed
        fields = ['id', 'name']


class BreedSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Breed
        fields = '__all__'


class BreedSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Breed
        fields = ['name', 'color']


class BreedHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Breed.history.__dict__['model']
        fields = '__all__'

# Breed HDEP Guide


class BreedHDEPGuideSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHDEPGuide
        fields = '__all__'


class BreedHDEPGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHDEPGuide
        fields = ['id', 'week', 'hdep']

    def create(self, validated_data):
        breed = models.Breed.objects.get(
            pk=self.context["view"].kwargs["breed_pk"])
        validated_data['breed'] = breed
        return super().create(validated_data)


# Breed HHEP Guide
class BreedHHEPGuideSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHHEPGuide
        fields = '__all__'


class BreedHHEPGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHHEPGuide
        fields = ['id', 'week', 'hhep']

    def create(self, validated_data):
        breed = models.Breed.objects.get(
            pk=self.context["view"].kwargs["breed_pk"])
        validated_data['breed'] = breed
        return super().create(validated_data)


# Breed Weight Guide
class BreedWeightGuideSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.BreedWeightGuide
        fields = '__all__'


class BreedWeightGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedWeightGuide
        fields = ['id', 'week', 'weight', 'weight_unit']

    def create(self, validated_data):
        breed = models.Breed.objects.get(
            pk=self.context["view"].kwargs["breed_pk"])
        validated_data['breed'] = breed
        return super().create(validated_data)
