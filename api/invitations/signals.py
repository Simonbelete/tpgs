import os
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import send_mail

from .models import Invitation
from .thread import SendInvitationEmailThread


@receiver(post_save, sender=Invitation)
def send_invitation(sender, instance, **kwargs):
    thread = SendInvitationEmailThread(instance.email)
    thread.start()
