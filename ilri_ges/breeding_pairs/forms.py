from django import forms

from breeding_pairs.models import BreedPair


class BreedPairForm(forms.ModelForm):
    class Meta:
        model = BreedPair
        fields = '__all__'
