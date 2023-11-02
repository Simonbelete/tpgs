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


## Breed Weight Guideline
class BreedWeightGuidelineSerializer_GET(serializers.ModelSerializer):
    breed = BreedSerializer_SLUG()
    class Meta:
        model = models.BreedWeightGuideline
        fields = ['id', 'breed', 'week', 'weight', 'display_name']


class BreedWeightGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedWeightGuideline
        fields = ['id', 'breed', 'week', 'weight']

    def create(self, validated_data):
        if('breed_pk' in self.context["view"].kwargs):
            breed = models.Breed.objects.get(
                pk=self.context["view"].kwargs["breed_pk"])
            validated_data['breed'] = breed
        return super().create(validated_data)

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

## Feed Guide
class FeedGuideSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.BreedFeedGuideline
        fields = '__all__'


class FeedGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedFeedGuideline
        fields = ['breed', 'week', 'feed']
    
        
## Egg Guide
class EggGuideSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.BreedEggGuideline
        fields = '__all__'


class EggGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedEggGuideline
        fields = ['breed', 'week', 'egg', 'weight']