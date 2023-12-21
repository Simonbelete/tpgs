from django.apps import AppConfig
from django.core.signals import setting_changed


class ChickensConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'chickens'

    def ready(self) -> None:
        from .signals import archive_all_on_archive

        setting_changed.connect(archive_all_on_archive)
