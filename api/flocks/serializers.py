from rest_framework import serializers

from . import models

class FlockSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Flock
        fields = ['id', 'name']


class FlockSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Flock
        fields = ['id', 'name', 'total_accusation',
                  'total_chickens', 'total_reduction', 'total_accusation', 'total_taged_chickens']


class FlockSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Flock
        fields = ['name']


class FlockHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Flock.history.__dict__['model']
        fields = '__all__'


class FlockAccusationSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.FlockAccusation
        fields = '__all__'


class FlockAccusationSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FlockAccusation
        fields = ['id', 'accusation',
                  'accusation_date', 'no_male_chickens', 'no_female_chickens', 'chickens']

    def create(self, validated_data):
        flock = models.Flock.objects.get(
            pk=self.context["view"].kwargs["flock_pk"])
        validated_data['flock'] = flock
        return super().create(validated_data)


class FlockReductionSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.FlockReduction
        fields = '__all__'


class FlockReductionSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FlockReduction
        fields = ['id', 'reduction_date',
                  'no_male_chickens', 'no_female_chickens', 'chickens', 'reason', 'note']

    def create(self, validated_data):
        flock = models.Flock.objects.get(
            pk=self.context["view"].kwargs["flock_pk"])
        validated_data['flock'] = flock
        return super().create(validated_data)
