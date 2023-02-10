from django import forms

import api.models as models


class UserForm(forms.ModelForm):
    class Meta:
        model = models.User
        fields = ['name', 'email']


class FeedTypeForm(forms.ModelForm):
    class Meta:
        model = models.FeedType
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
