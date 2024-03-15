from . import models
from celery import shared_task
import pandas as pd
from tablib import Dataset
import importlib
import logging
from django.utils import timezone
from django.template.loader import render_to_string
from django_tenants.utils import tenant_context
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

logger = logging.getLogger(__name__)


def _run_import(instance, dry_run=True):
    """_summary_

    Args:
        instance (ImportJob): ImportJob model
        dry_run (bool, optional): _description_. Defaults to True.
    """
    with tenant_context(instance.farm):
        # Load resource
        module = importlib.import_module('import_export_job.resources')
        resource = getattr(module, instance.resource)

        resource = resource(import_job=instance)

        df = resource.read_file()

        dataset = Dataset().load(df)
        result = resource.import_data(dataset=dataset, dry_run=dry_run)

        rendered = render_to_string("import_result.html", {'result': result})

        # Append all results if found
        rendered = rendered + "<br />" + resource.get_rendered_results()

        instance.report = rendered
        if result.has_errors():
            instance.job_status = 'ERROR'
            instance.errors += "[DRY RUN] Failed to Import" if not dry_run else "[COMMIT] Failed to Import"
        else:
            instance.job_status = "DRY RUN" if not dry_run else "DONE"
        instance.save()


@shared_task
def run_import_job(pk):
    import_job = models.ImportJob.objects.get(pk=pk)
    with tenant_context(import_job.farm):
        try:
            _run_import(import_job, dry_run=True)
            _run_import(import_job, dry_run=False)
        except Exception as e:
            logger.error(
                "Some error occurred while ImportJob file: {0}".format(e)
            )
            import_job.errors += "Import error %s" % e + "\n"
            import_job.job_status = 'ERROR'
            import_job.save()
            return


def _run_export(instance):
    """_summary_

    Args:
        instance (ExportJob): ExportJob model
    """
    with tenant_context(instance.farm):
        # Load resource
        module = importlib.import_module('import_export_job.resources')
        resource = getattr(module, instance.resource)

        resource_obj = resource()
        qs = resource_obj.Meta.model.objects.filter(**instance.filter_dict)

        dataset = resource_obj.export(qs)

        filename = "{name}-{date}.{extension}".format(
            name=instance.resource,
            date=str(timezone.now()),
            extension=instance.format,
        )

        path = default_storage.save(
            "{0}".format(filename), ContentFile(dataset.csv))

        instance.file = path
        instance.job_status = 'DONE'
        instance.save()
        return


@shared_task
def run_export_job(pk):
    export_job = models.ExportJob.objects.get(pk=pk)
    with tenant_context(export_job.farm):
        try:
            _run_export(export_job)
        except Exception as e:
            print(e)
            logger.error(
                "Error occured while exporting: {0}".format(str(e))
            )
            export_job.errors = str(e)
            export_job.job_status = 'ERROR'
            export_job.save()
            return
