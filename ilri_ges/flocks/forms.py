from django import forms

from .models import Flock


class FlockForm(forms.ModelForm):
    class Meta:
        model = Flock
        fields = ['name', 'breed_type', 'farm']
