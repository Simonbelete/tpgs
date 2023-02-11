from django import forms

import api.models as models


class LoginForm(forms.Form):
    email = forms.CharField()
    password = forms.CharField()


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


class ChickenForm(forms.ModelForm):
    class Meta:
        model = models.Chicken
        fields = ['tag', 'sex', 'farm', 'house',
                  'breed_type', 'layed_place', 'is_double_yolk', 'is_active']


class FeedForm(forms.ModelForm):
    class Meta:
        model = models.Feed
        fields = ['chicken', 'date', 'weight', 'feed_type']


class EggForm(forms.ModelForm):
    class Meta:
        model = models.Feed
        fields = ['date', 'chicken']


class FlockForm(forms.ModelForm):
    class Meta:
        model = models.Flock
        fields = ['hatch_date', 'farm', 'breed_type']


class WeightForm(forms.ModelForm):
    class Meta:
        model = models.Weight
        fields = ['week', 'weight', 'chicken']
