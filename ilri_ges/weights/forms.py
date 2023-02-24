from django import forms

from weights.models import Weight


class WeightForm(forms.ModelForm):
    week = forms.IntegerField(min_value=0)
    weight = forms.DecimalField(
        max_digits=10, decimal_places=3, min_value=0.1, max_value=1)

    class Meta:
        model = Weight
        fields = ['week', 'weight', 'chicken']
