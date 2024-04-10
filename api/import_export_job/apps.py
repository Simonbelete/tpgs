from django.apps import AppConfig
from django.core.signals import setting_changed


class ImportExportJobConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'import_export_job'

    def ready(self):
        from .signals import import_job_post_save, exportjob_post_save
        setting_changed.connect(import_job_post_save)
        # setting_changed.connect(exportjob_post_save)
