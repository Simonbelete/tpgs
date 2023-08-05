import os
from django.dispatch import receiver
from django.db.models.signals import post_save, m2m_changed
from django.core.mail import send_mail

from .models import FlockReduction
from chickens.models import Chicken


def sync_flock_with_chicken(sender, instance, **kwargs):
    """ Update single chicken based on flock selection """
    chickens = instance.chickens.all()
    if (chickens):
        for chicken in chickens.iterator():
            chi = Chicken.objects.get(pk=chicken.id)
            chi.reduction_date = instance.reduction_date
            chi.reduction_reason = instance.reason
            chi.save()


m2m_changed.connect(sync_flock_with_chicken, FlockReduction.chickens.through)
