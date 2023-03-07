from django import forms

from .models import Egg


class EggForm(forms.ModelForm):
    class Meta:
        model = Egg
        fields = ['week', 'eggs', 'total_weight', 'chicken']
