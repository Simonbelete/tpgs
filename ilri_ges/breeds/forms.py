from django import forms

from .models import BreedType


class BreedForm(forms.ModelForm):
    class Meta:
        model = BreedType
        fields = ['name', 'color']
