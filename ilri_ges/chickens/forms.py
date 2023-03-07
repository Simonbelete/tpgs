from django import forms

from .models import Chicken


class ChickenForm(forms.ModelForm):
    class Meta:
        model = Chicken
        fields = ['tag', 'sex', 'farm', 'hatch_date', 'egg_weight',
                  'house', 'breed_type', 'is_double_yolk', 'breed_pair']
