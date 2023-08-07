from django.apps import AppConfig
from django.core.signals import setting_changed


class AuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'auths'

    def ready(self):
        from .signals import password_reset_token_created

        setting_changed.connect(password_reset_token_created)
