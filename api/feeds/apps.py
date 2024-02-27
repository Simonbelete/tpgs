from django.apps import AppConfig
from django.core.signals import setting_changed


class FeedsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'feeds'

    def ready(self) -> None:
        from .signals import feed_post_save

        setting_changed.connect(feed_post_save)
