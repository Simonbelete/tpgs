import threading
from django.core.mail import EmailMultiAlternatives
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.template.loader import get_template
from django.template import Context
from django.conf import settings


class SendPasswordResetEmailThread(threading.Thread):
    def __init__(self, context):
        self.context = context
        threading.Thread.__init__(self)

    def run(self):
        try:
            email_html_message = render_to_string(
                'email/reset_password/reset_password.html', self.context)
            email_plaintext_message = render_to_string(
                'email/reset_password/reset_password.txt', self.context)
            email = EmailMultiAlternatives(
                "Password Reset for {title}".format(
                    title="TPGS Platforms"),
                email_plaintext_message,
                settings.NO_REPLAY_EMAIL_ADDRESS,
                [self.context.to_email])
            email.attach_alternative(email_html_message, "text/html")
            email.send()
        except:
            pass
