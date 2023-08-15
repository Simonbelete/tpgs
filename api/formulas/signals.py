import os
from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Formula
from .formulate import Formulate


@receiver(post_save, sender=Formula)
def compute_formula(sender, instance, **kwargs):
    formulate = Formulate()
