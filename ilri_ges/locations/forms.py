from django import forms

from .models import City, Country, House, LayedPlace


class CountryForm(forms.ModelForm):
    class Meta:
        model = Country
        fields = ['name']


class CityForm(forms.ModelForm):
    class Meta:
        model = City
        fields = ['name', 'country']


class HouseForm(forms.ModelForm):
    class Meta:
        model = House
        fields = ['name', 'farm']


class LayedPlaceForm(forms.ModelForm):
    class Meta:
        model = LayedPlace
        fields = ['name']
