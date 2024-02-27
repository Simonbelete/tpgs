from . import models
from celery import shared_task
import pandas as pd
from tablib import Dataset
import importlib
import logging
from django.template.loader import get_template, render_to_string
from django.template import Context
from django_tenants.utils import tenant_context

logger = logging.getLogger(__name__)


def read_file(file, format):
    file_open = file.open('r')
    if (format == "csv"):
        return pd.read_csv(file_open, header=0, encoding='utf-8', engine='python')
    elif (format == "xlsx" or format == "xls"):
        return pd.read_excel(file_open, header=0)
    else:
        raise Exception("Not Valid file format try csv,xlsx, xls")


def _run_import(instance, dry_run=True):
    with tenant_context(instance.farm):
        df = read_file(instance.file, instance.format)
        module = importlib.import_module('import_export_job.resources')
        resource = getattr(module, instance.resource)
        resource = resource()

        df = resource.after_read_file(df)
        dataset = Dataset().load(df)
        result = resource.import_data(dataset=dataset, dry_run=dry_run)

        rendered = render_to_string("import_result.html", {'result': result})

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
                "Some error occurred while deleting ImportJob file: {0}".format(
                    e)
            )
            import_job.errors += "Import error %s" % e + "\n"
            import_job.job_status = 'ERROR'
            import_job.save()
            return
