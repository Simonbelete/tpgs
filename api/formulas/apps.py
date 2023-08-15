from django.apps import AppConfig
from django.core.signals import setting_changed


class FormulaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'formulas'

    def ready(self):
        from .signals import compute_formula

        setting_changed.connect(compute_formula)
