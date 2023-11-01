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
        fields = ['id', 'name', 'color']


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


## Breed Weight Guide
class BreedWeightGuideSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.BreedWeightGuide
        fields = '__all__'


class BreedWeightGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedWeightGuide
        fields = ['id', 'week', 'weight']

    def create(self, validated_data):
        if(self.context["view"].kwargs["breed_pk"]):
            breed = models.Breed.objects.get(
                pk=self.context["view"].kwargs["breed_pk"])
            validated_data['breed'] = breed
        return super().create(validated_data)

## Feed Guide
class FeedGuideSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.BreedFeedGuide
        fields = '__all__'


class FeedGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedFeedGuide
        fields = ['breed', 'week', 'feed']
    
        
## Egg Guide
class EggGuideSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.BreedEggGuide
        fields = '__all__'


class EggGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedEggGuide
        fields = ['breed', 'week', 'egg', 'weight']