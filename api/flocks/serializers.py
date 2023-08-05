from rest_framework import serializers

from . import models


class FlockSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Flock
        fields = ['id', 'name', 'total_accusation',
                  'total_chickens', 'total_reduction', 'total_accusation']


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
                  'accusation_date', 'no_chicken', 'chickens']

    def create(self, validated_data):
        flock = models.Flock.objects.get(
            pk=self.context["view"].kwargs["flock_pk"])
        validated_data['flock'] = flock
        return super().create(validated_data)
