import threading
from django.core.mail import EmailMultiAlternatives
from django.core.mail import send_mail
from django.template.loader import get_template
from django.template import Context


class SendInvitationEmailThread(threading.Thread):
    def __init__(self, to_email):
        self.to_email = to_email

        threading.Thread.__init__(self)

    def run(self):
        try:
            html = get_template('invite.html')
            context = Context({'link': 'http://127.0.0.01:300/token'})
            html_content = html.render(context)
            email = EmailMultiAlternatives(
                'Invite', "", 'no-replay@example.com', [self.to_email])
            email.attach_alternative(html_content, "text/html")
            email.send()
        except:
            pass
