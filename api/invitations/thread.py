import threading
from django.core.mail import send_mail


class SendInvitationEmailThread(threading.Thread):
    def __init__(self, to_email):
        self.to_email = to_email

        threading.Thread.__init__(self)

    def run(self):
        try:
            send_mail(
                "Subject here",
                "Here is the message.",
                "sim@example.com",
                [self.to_email],
                fail_silently=False,
            )
        except:
            pass
