import uuid
from datetime import datetime, timedelta
from django.db import models

from users.models import User


class Invitation(models.Model):
    inviter = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, max_length=255, unique=True,)
    email = models.EmailField()
    sent_date = models.DateTimeField(auto_now_add=True, null=True)
    # expire_date = models.DateField()
    accepted = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        # self.expire_date = datetime.today() + timedelta(days=4)
        return super().save(*args, **kwargs)
