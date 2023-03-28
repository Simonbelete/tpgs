from django import forms
from django.contrib.auth.forms import PasswordResetForm

from .models import User
from farms.models import Farm


class LoginForm(forms.Form):
    email = forms.EmailField(required=False)
    password = forms.CharField()


class UserCredentialForm(forms.ModelForm):
    password = forms.PasswordInput()

    class Meta:
        model = User
        fields = ['name', 'email', 'farms', 'password', 'groups', 'is_active']


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'email', 'farms', 'groups', 'is_active']
