from django.db import models
from core.models import BaseTimestampedModel


class Contact(BaseTimestampedModel):
    name = models.CharField(max_length=158)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name
