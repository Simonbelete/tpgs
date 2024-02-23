from django.apps import AppConfig
from django.core.signals import setting_changed


class HatcheryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hatchery'

    def ready(self):
        from .signals import sync_to_chicken, remove_hatchery
        setting_changed.connect(remove_hatchery)
        setting_changed.connect(sync_to_chicken)
