from rest_framework import serializers

from . import models


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

# Breed HDEP Guid


class BreedHDEPGuidSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHDEPGuid
        fields = '__all__'


class BreedHDEPGuidSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHDEPGuid
        fields = ['id', 'week', 'hdep']

    def create(self, validated_data):
        breed = models.Breed.objects.get(
            pk=self.context["view"].kwargs["breed_pk"])
        validated_data['breed'] = breed
        return super().create(validated_data)


# class BreedHDEPGuidSerializer_PATCH(serializers.ModelSerializer):
#     class Meta:
#         model = models.BreedHDEPGuid
#         fields = ['week', 'hdep']

#     def create(self, validated_data):
#         breed = models.Breed.objects.get(
#             pk=self.context["view"].kwargs["breed_pk"])
#         validated_data['breed'] = breed
#         return super().create(validated_data)
