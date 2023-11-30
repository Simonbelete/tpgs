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
    send_invitation_email(instance.inviter, instance.email, instance.token)

    # if(not instance.send_date):
    #     instance.sent_date = datetime.today()
    #     context = {
    #         'to_email': instance.email,
    #         'link': "{url}/verify/{token}".format(url=settings.SITE_URL, token=instance.token)
    #     }
    #     thread = SendInvitationEmailThread(context)
    #     thread.start()
    # elif(instance.accepted):
    #     notify.send(
    #         sender=instance,
    #         recipient=instance.inviter,
    #         verb='User %s accepted your invitation' % instance.email,
    #         level='info')
