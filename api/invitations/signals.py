import os
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import send_mail

from .models import Invitation


@receiver(post_save, sender=Invitation)
def send_invitation(sender, instance, **kwargs):

    print(instance)
    send_mail(
        "Subject here",
        "Here is the message.",
        "sim@example.com",
        ["to@example.com"],
        fail_silently=False,
    )
