import threading
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template, render_to_string
from django.template import Context
from django.conf import settings


class SendInvitationEmailThread(threading.Thread):
    def __init__(self, context):
        self.context = context
        threading.Thread.__init__(self)

    def run(self):
        try:
            email_html_message = render_to_string(
                'email/account_invitation/account_invitation.html', self.context)
            email_plaintext_message = render_to_string(
                'email/account_invitation/account_invitation.txt', self.context)
            email = EmailMultiAlternatives(
                "You have been invited to join {title}".format(
                    title="TPGS Platforms"),
                email_plaintext_message,
                settings.NO_REPLAY_EMAIL_ADDRESS,
                [self.context['to_email']])
            email.attach_alternative(email_html_message, "text/html")
            email.send()
        except:
            pass
