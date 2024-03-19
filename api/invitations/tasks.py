from celery import shared_task
from django.conf import settings
from notifications.signals import notify
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template, render_to_string
from users.models import User


@shared_task
def send_invitation_email(sender, email, token, expire_date):
    """
    params:
    ------
        sender: User id
        email: string
        token: string
    """
    try:
        context = {
            'to_email': email,
            'link': "{url}/verify/{token}".format(url=settings.SITE_URL, token=token),
            'expire_date': expire_date
        }
        email_html_message = render_to_string(
            'email/account_invitation/account_invitation.html', context)
        email_plaintext_message = render_to_string(
            'email/account_invitation/account_invitation.txt', context)
        email_multi = EmailMultiAlternatives(
            "You have been invited to join {title}".format(
                title="TPGS Platforms"),
            email_plaintext_message,
            settings.NO_REPLAY_EMAIL_ADDRESS,
            [email])
        email_multi.attach_alternative(email_html_message, "text/html")
        email_multi.send()
        user = User.objects.get(pk=sender)
        notify.send(
            sender=user,
            recipient=user,
            verb="Invitation email to {email} successfully sent".format(
                email=email),
            level='info')
    except Exception as ex:
        print('----------')
        print(ex)
        user = User.objects.get(pk=sender)
        notify.send(
            sender=user,
            recipient=user,
            verb="Failed to send invitation email to {email}".format(
                email=email),
            level='error')
