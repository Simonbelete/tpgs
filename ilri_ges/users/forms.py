from django import forms
from django.contrib.auth.forms import PasswordResetForm

from .models import User
from farms.models import Farm


class LoginForm(forms.Form):
    email = forms.EmailField(required=False)
    password = forms.CharField()


class UserForm(forms.ModelForm):
    # name = forms.CharField()
    # email = forms.EmailField()
    # password = forms.CharField()
    # farms = forms.ModelMultipleChoiceField(
    #     queryset=Farm.objects.all(), blank=True)
    class Meta:
        model = User
        fields = ['name', 'email', 'farms', 'is_active']
