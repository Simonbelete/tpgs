import os
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import send_mail

from .models import Contact
from .thread import SendContactUsEmailThread


@receiver(post_save, sender=Contact)
def send_contact_us(sender, instance, **kwargs):
    thread = SendContactUsEmailThread(
        instance.name, instance.email, instance.message)
    thread.start()
