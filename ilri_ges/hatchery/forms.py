from django import forms
from .models import Hatchery, Incubation, Candling

class HatcheryForm(forms.ModelForm):
    class Meta:
        model = Hatchery
        fields = ['date', 'no_egg', 'breed_type', 'farm']

    