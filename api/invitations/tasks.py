from celery import shared_task
from django.conf import settings
from notifications.signals import notify
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template, render_to_string
from django.template import Context

@shared_task
def send_invitation_email(sender, email, token):
    """
    params:
    ------
        sender: User instance
        email: string
        token: string
    """
    try:
        context = {
            'to_email': email,
            'link': "{url}/verify/{token}".format(url=settings.SITE_URL, token=token)
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
        notify.send(
            sender=sender,
            recipient=sender,
            verb="Invitation email to {email} successfully sent".format(email=email), 
            level='info')
    except Exception as ex:
        notify.send(
            sender=sender,
            recipient=sender,
            verb="Failed to send invitation email to {email}".format(email=email), 
            level='error')