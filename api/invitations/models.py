import uuid
from datetime import datetime, timedelta
from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone

from users.models import User
from farms.models import Farm


class Invitation(models.Model):
    inviter = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, max_length=255, unique=True,)
    email = models.EmailField(unique=True)
    sent_date = models.DateTimeField(auto_now_add=True, null=True)
    expire_date = models.DateTimeField()
    accepted = models.BooleanField(default=False)
    farms = models.ManyToManyField(Farm)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-sent_date"]

    def save(self, *args, **kwargs):
        self.clean()
        self.expire_date = timezone.now().date() + timedelta(days=7)
        return super().save(*args, **kwargs)

    def clean(self) -> None:
        user = User.objects.filter(email=self.email).count()
        if (user != 0):
            raise ValidationError({
                'email': 'User already exists'
            })
        return super().clean()
