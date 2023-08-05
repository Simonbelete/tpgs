from django.apps import AppConfig
from django.core.signals import setting_changed


class FlocksConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'flocks'

    def ready(self):
        from .signals import sync_flock_with_chicken
        setting_changed.connect(sync_flock_with_chicken)
