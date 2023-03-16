from django import forms

from weights.models import Weight


class WeightForm(forms.ModelForm):
    week = forms.IntegerField(min_value=0)
    weight = forms.DecimalField(
        max_digits=10, decimal_places=3)

    class Meta:
        model = Weight
        fields = ['week', 'weight', 'chicken']
