import os
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import send_mail
from datetime import datetime
from notifications.signals import notify
from django.conf import settings

from .models import Invitation
from .thread import SendInvitationEmailThread
from .tasks import send_invitation_email


@receiver(post_save, sender=Invitation)
def send_invitation(sender, instance, **kwargs):
    send_invitation_email(instance.inviter, instance.email,
                          instance.token, instance.expire_date)
