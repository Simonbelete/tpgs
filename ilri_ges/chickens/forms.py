from django import forms

from .models import Chicken


class ChickenForm(forms.ModelForm):
    hatch_date = forms.DateField(
        widget=forms.widgets.DateInput(format="%d-%m-%Y"))

    class Meta:
        model = Chicken
        fields = ['tag', 'sex', 'farm', 'hatch_date', 'egg_weight',
                  'house', 'breed_type', 'is_double_yolk', 'breed_pair']


class ChickenState(forms.Form):
    is_dead = forms.BooleanField()
    dead_date = forms.DateField()
    days_alive = forms.IntegerField()

    class Meta:
        fields = ['is_dead', 'dead_date', 'days_alive']
