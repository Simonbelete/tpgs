import uuid
from datetime import datetime, timedelta
from django.db import models
from django.core.exceptions import ValidationError

from users.models import User
from farms.models import Farm


class Invitation(models.Model):
    inviter = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, max_length=255, unique=True,)
    email = models.EmailField()
    sent_date = models.DateTimeField(auto_now_add=True, null=True)
    expire_date = models.DateTimeField()
    accepted = models.BooleanField(default=False)
    farms = models.ForeignKey(Farm, on_delete=models.DO_NOTHING)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        self.clean()
        self.expire_date = datetime.today() + timedelta(days=7)
        return super().save(*args, **kwargs)

    def clean(self) -> None:
        user = User.objects.filter(email=self.email).count()
        if (user != 0):
            raise ValidationError({
                'email': 'User already exists'
            })
        return super().clean()
