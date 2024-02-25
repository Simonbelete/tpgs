from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils import timezone
from django.db import transaction

from . import models
from .tasks import run_import_job


@receiver(post_save, sender=models.ImportJob)
def import_job_post_save(sender, instance, **kwargs):
    if not instance.processing_initiated:
        instance.processing_initiated = timezone.now()
        instance.job_status = 'DRY_RUN'
        instance.save()
        transaction.on_commit(
            lambda: run_import_job.delay(
                instance.pk
            )
        )
