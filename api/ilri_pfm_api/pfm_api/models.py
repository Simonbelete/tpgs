from django.contrib.auth.models import User
from django.conf import settings
from django.db import models
from simple_history.models import HistoricalRecords

class HistoryModel(models.Model):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE)

    class Meta:
        abstract = True

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,
      on_delete=models.CASCADE)
    history = HistoricalRecords(
       bases=[HistoryModel]
    )

    class Meta:
        abstract = True

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    bio = models.CharField(max_length=200)

class Farm(BaseModel):
    name = models.CharField(max_length = 250)
    code = models.CharField(max_length = 250)