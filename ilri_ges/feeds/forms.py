from django import forms

from .models import Feed, FeedType


class FeedTypeForm(forms.ModelForm):
    class Meta:
        model = FeedType
        fields = ['name']


class FeedForm(forms.ModelForm):
    class Meta:
        model = Feed
        fields = ['week', 'chicken', 'feed_offered',
                  'feed_refusal', 'feed_type']
