from django.apps import AppConfig
from django.core.signals import setting_changed


class FeedsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'feeds'

    def ready(self) -> None:
        from .signals import create_individual_from_batch

        setting_changed.connect(create_individual_from_batch)
