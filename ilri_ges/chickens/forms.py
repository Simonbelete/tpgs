from django import forms

from .models import Chicken
from breeds.models import BreedType
from farms.models import Farm
from locations.models import House


class ChickenForm(forms.ModelForm):
    hatch_date = forms.DateField(input_formats=["%d/%m/%Y"],
                                 widget=forms.widgets.DateInput(format="%d/%m/%Y"), required=False)

    class Meta:
        model = Chicken
        fields = ['tag', 'sex', 'farm', 'hatch_date', 'egg_weight',
                  'house', 'breed_type', 'flock', 'breed_pair', 'pen']


class ChickenCreateForm(forms.ModelForm):
    hatch_date = forms.DateField(input_formats=["%d/%m/%Y"],
                                 widget=forms.widgets.DateInput(format="%d/%m/%Y"), required=False)
    dead_date = forms.DateField(input_formats=["%d/%m/%Y"],
                                widget=forms.widgets.DateInput(format="%d/%m/%Y"), required=False)

    class Meta:
        model = Chicken
        fields = ['tag', 'sex', 'farm', 'hatch_date', 'egg_weight',
                  'house', 'breed_type', 'is_active', 'flock', 'breed_pair', 'pen', 'is_dead', 'dead_date']


class ChickenStateForm(forms.ModelForm):
    dead_date = forms.DateField(input_formats=["%d/%m/%Y"],
                                widget=forms.widgets.DateInput(format="%d/%m/%Y"), required=False)

    class Meta:
        model = Chicken
        fields = ['is_dead', 'dead_date']


class ChickenImportForm(forms.ModelForm):
    class Meta:
        model = Chicken
        fields = ['breed_type', 'farm']


class ChickenExportForm(forms.Form):
    start_week = forms.IntegerField()
    end_week = forms.IntegerField()
    breed_type = forms.ModelChoiceField(queryset=BreedType.objects.all())
    farm = forms.ModelChoiceField(queryset=Farm.objects.all())
    house = forms.ModelChoiceField(queryset=House.objects.all())
