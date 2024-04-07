from django.db import models
from farms.models import Farm
from django.conf import settings
from django.core.files.storage import FileSystemStorage


export_fs = FileSystemStorage(location="{0}/exportdata".format(settings.MEDIA_ROOT))
import_fs = FileSystemStorage(location="{0}/importdata".format(settings.MEDIA_ROOT))


class ImportJob(models.Model):
    JOB_STATUS = (
        ('START', 'Starting'),
        ('DRY_RUN', 'Dry Run'),
        ('IMPORTING', 'Importing'),
        ('ERROR', 'Error'),
        ('DONE', 'Done'),
    )

    file = models.FileField(storage=import_fs)
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE)

    processing_initiated = models.DateTimeField(
        null=True,
        blank=True,
        default=None,
    )

    format = models.CharField(
        verbose_name="Format of file to be imported",
        max_length=255,
    )
    errors = models.TextField(
        verbose_name="Errors",
        default="",
        blank=True,
    )
    report = models.TextField(
        verbose_name="HTML rendered report",
        default="",
        blank=True,
    )
    resource = models.CharField(
        verbose_name="Name of resource to import to",
        max_length=160,
    )
    job_status = models.CharField(
        verbose_name="Status of the job",
        max_length=160,
        blank=True,
        choices=JOB_STATUS
    )
    uploaded_on = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return self.uploaded_on.date()

    class Meta:
        ordering = ('-uploaded_on',)


class ExportJob(models.Model):
    JOB_STATUS = (
        ('START', 'Starting'),
        ('EXPORTING', 'Exporting'),
        ('ERROR', 'Error'),
        ('DONE', 'Done'),
    )

    file = models.FileField()
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE)

    processing_initiated = models.DateTimeField(
        null=True,
        blank=True,
        default=None,
    )

    resource = models.CharField(
        verbose_name="Name of resource to export to",
        max_length=160,
    )

    filter_dict = models.TextField(
        verbose_name="Dict of query parameters",
        null=True,
    )

    format = models.CharField(
        verbose_name="Format of file to be imported",
        max_length=255,
    )
    job_status = models.CharField(
        verbose_name="Status of the job",
        max_length=160,
        blank=True,
        choices=JOB_STATUS
    )
    email_on_completion = models.BooleanField(
        verbose_name="Send me an email when this export job is complete",
        default=True,
    )
    errors = models.TextField(
        verbose_name="Errors",
        default="",
        blank=True,
    )
    process_finished = models.DateTimeField(
        null=True, blank=True, default=None)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True)

    class Meta:
        ordering = ('-processing_initiated',)

    @property
    def file_exists(self):
        if (self.file):
            return export_fs.exists(self.file.path)
        else:
            return False
