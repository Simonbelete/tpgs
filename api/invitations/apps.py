from django.apps import AppConfig
from django.core.signals import setting_changed


class InvitationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'invitations'

    def ready(self):
        from .signals import send_invitation

        setting_changed.connect(send_invitation)
