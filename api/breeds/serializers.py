from rest_framework import serializers

from . import models


class BreedSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Breed
        fields = ['id', 'name']


class BreedSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Breed
        fields = ['id', 'display_name', 'name',
                  'color', 'is_active', 'created_at']


class BreedSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Breed
        fields = ['id', 'name', 'color', 'is_active']


class BreedHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Breed.history.__dict__['model']
        fields = '__all__'


# Breed Weight Guideline
class BreedWeightGuidelineSerializer_GET(serializers.ModelSerializer):
    breed = BreedSerializer_SLUG()

    class Meta:
        model = models.BreedWeightGuideline
        fields = ['id', 'breed', 'week', 'weight',
                  'display_name', 'is_active', 'created_at']


class BreedWeightGuidelineSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedWeightGuideline
        fields = ['id', 'breed', 'week', 'weight', 'is_active']

    def create(self, validated_data):
        if ('breed_pk' in self.context["view"].kwargs):
            breed = models.Breed.objects.get(
                pk=self.context["view"].kwargs["breed_pk"])
            validated_data['breed'] = breed
        return super().create(validated_data)


class BreedWeightGuidelineHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BreedWeightGuideline.history.__dict__['model']
        fields = '__all__'


# Breed HDEP Guide

class BreedHDEPGuidelineSerializer_GET(serializers.ModelSerializer):
    breed = BreedSerializer_SLUG()

    class Meta:
        model = models.BreedHDEPGuideline
        fields = ['id', 'breed', 'week', 'hdep', 'display_name']


class BreedHDEPGuidelineSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHDEPGuideline
        fields = ['id', 'breed', 'week', 'hdep']

    def create(self, validated_data):
        if ('breed_pk' in self.context["view"].kwargs):
            breed = models.Breed.objects.get(
                pk=self.context["view"].kwargs["breed_pk"])
            validated_data['breed'] = breed
        return super().create(validated_data)


class BreedHDEPGuidelineHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHDEPGuideline.history.__dict__['model']
        fields = '__all__'


# Breed HHEP Guide

class BreedHHEPGuidelineSerializer_GET(serializers.ModelSerializer):
    breed = BreedSerializer_SLUG()

    class Meta:
        model = models.BreedHHEPGuideline
        fields = ['id', 'breed', 'week', 'hhep', 'display_name']


class BreedHHEPGuidelineSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHHEPGuideline
        fields = ['id', 'breed', 'week', 'hhep']

    def create(self, validated_data):
        if ('breed_pk' in self.context["view"].kwargs):
            breed = models.Breed.objects.get(
                pk=self.context["view"].kwargs["breed_pk"])
            validated_data['breed'] = breed
        return super().create(validated_data)


class BreedHHEPGuidelineHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BreedHHEPGuideline.history.__dict__['model']
        fields = '__all__'


# Feed Guideline
class BreedFeedGuidelineSerializer_GET(serializers.ModelSerializer):
    breed = BreedSerializer_SLUG()

    class Meta:
        model = models.BreedFeedGuideline
        fields = ['id', 'breed', 'week', 'weight', 'display_name']


class BreedFeedGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedFeedGuideline
        fields = ['id', 'breed', 'week', 'weight']

    def create(self, validated_data):
        if ('breed_pk' in self.context["view"].kwargs):
            breed = models.Breed.objects.get(
                pk=self.context["view"].kwargs["breed_pk"])
            validated_data['breed'] = breed
        return super().create(validated_data)


class BreedFeedGuidelineHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BreedFeedGuideline.history.__dict__['model']
        fields = '__all__'


# Egg Guideline
class BreedEggGuidelineSerializer_GET(serializers.ModelSerializer):
    breed = BreedSerializer_SLUG()

    class Meta:
        model = models.BreedEggGuideline
        fields = ['id', 'breed', 'week', 'egg', 'weight', 'display_name']


class BreedEggGuideSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.BreedEggGuideline
        fields = ['id', 'breed', 'week', 'egg', 'weight']

    def create(self, validated_data):
        if ('breed_pk' in self.context["view"].kwargs):
            breed = models.Breed.objects.get(
                pk=self.context["view"].kwargs["breed_pk"])
            validated_data['breed'] = breed
        return super().create(validated_data)


class BreedEggGuidelineHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BreedEggGuideline.history.__dict__['model']
        fields = '__all__'
