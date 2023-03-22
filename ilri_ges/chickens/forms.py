from django import forms

from .models import Chicken


class ChickenForm(forms.ModelForm):
    # hatch_date = forms.DateField(
    #     widget=forms.widgets.DateInput(format="%d-%m-%Y"))

    class Meta:
        model = Chicken
        fields = ['tag', 'sex', 'farm', 'hatch_date', 'egg_weight',
                  'house', 'breed_type', 'is_active', 'flock', 'breed_pair']


class ChickenStateForm(forms.ModelForm):
    class Meta:
        model = Chicken
        fields = ['is_dead', 'dead_date', 'days_alive']


class ChickenImportForm(forms.ModelForm):
    class Meta:
        model = Chicken
        fields = ['breed_type', 'farm']
