import uuid
from django.db import models

from users.models import User


class Invitation(models.Model):
    inviter = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, max_length=255, unique=True,)
    email = models.EmailField()
    sent_date = models.DateTimeField(auto_now_add=True, null=True)
    accepted = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
