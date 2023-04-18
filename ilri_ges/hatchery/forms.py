from django import forms
from .models import Hatchery, Incubation, Candling


class HatcheryForm(forms.ModelForm):
    class Meta:
        model = Hatchery
        fields = ['date', 'no_egg', 'breed_type', 'farm']


class IncubationForm(forms.ModelForm):
    class Meta:
        model = Incubation
        fields = ['hatchery', 'date_time', 'temperature_celsius',
                  'humidity_fahrenheit', 'humidity_percent', 'remark']


class CandlingForm(forms.ModelForm):
    class Meta:
        model = Candling
        fields = ['hatchery', 'date', 'no_egg', 'infertile_egg',
                  'no_of_hatched', 'no_dead', 'no_culled']
