from django import forms

from .models import User


class LoginForm(forms.Form):
    email = forms.EmailField(required=False)
    password = forms.CharField()


class UserForm(forms.ModelForm):
    # name = forms.CharField()
    # email = forms.EmailField()
    # password = forms.CharField()

    class Meta:
        model = User
        fields = ['name', 'email', 'password']
