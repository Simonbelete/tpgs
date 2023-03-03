from django import forms

from .models import User
from farms.models import Farm


class LoginForm(forms.Form):
    email = forms.EmailField(required=False)
    password = forms.CharField()


class UserForm(forms.Form):
    name = forms.CharField()
    email = forms.EmailField()
    password = forms.CharField()
    farms = forms.ModelMultipleChoiceField(
        queryset=Farm.objects.all(), blank=True)
