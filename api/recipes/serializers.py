from rest_framework import serializers
from . import models


class Recipe_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Recipes
        fields = '__all__'
