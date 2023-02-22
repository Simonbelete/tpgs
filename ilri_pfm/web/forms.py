from django import forms
from rest_framework import serializers

import api.models as models


class LoginForm(forms.Form):
    email = forms.CharField()
    password = forms.CharField()


class UserForm(forms.ModelForm):
    class Meta:
        model = models.User
        fields = ['name', 'email', 'password', 'is_active']


class FeedTypeForm(forms.ModelForm):
    class Meta:
        model = models.FeedType
        fields = ['name']


class CityForm(forms.ModelForm):
    class Meta:
        model = models.City
        fields = ['name', 'country']


class CountryForm(forms.ModelForm):
    class Meta:
        model = models.Country
        fields = ['name']


class LayedPlaceForm(forms.ModelForm):
    class Meta:
        model = models.LayedPlace
        fields = ['name']


class StageForm(forms.ModelForm):
    class Meta:
        model = models.Stage
        fields = ['name']


class BreedTypeForm(forms.ModelForm):
    class Meta:
        model = models.BreedType
        fields = ['name']


class FarmForm(forms.ModelForm):
    class Meta:
        model = models.Farm
        fields = ['name']


class ChickenForm(forms.ModelForm):
    class Meta:
        model = models.Chicken
        fields = ['tag', 'sex', 'farm', 'house',
                  'breed_type', 'layed_place', 'is_double_yolk', 'is_active']


class FeedForm(forms.ModelForm):
    class Meta:
        model = models.Feed
        fields = ['chicken', 'date', 'weight', 'feed_type']


class ChickenState(forms.Form):
    is_dead = forms.BooleanField()
    dead_date = forms.DateField()

    class Meta:
        fields = ['is_dead', 'dead_date']


class EggForm(forms.ModelForm):
    class Meta:
        model = models.Egg
        fields = ['chicken', 'week', 'eggs']


class FlockForm(forms.ModelForm):
    class Meta:
        model = models.Flock
        fields = ['hatch_date', 'farm', 'breed_type']


class WeightForm(forms.ModelForm):
    class Meta:
        model = models.Weight
        fields = ['week', 'weight', 'chicken']


class BreedingPairForm(forms.Form):
    sir = forms.IntegerField()
    dams = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Chicken.objects.all(), many=True)
    date = serializers.DateField()

    class Meta:
        fields = []
