from django import forms

import api.models as models


class UserForm(forms.ModelForm):
    class Meta:
        model = models.User
        fields = ['name', 'email']