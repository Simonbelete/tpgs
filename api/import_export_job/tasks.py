from . import models
from celery import shared_task
import pandas as pd
from tablib import Dataset
import importlib
import logging
from django.template.loader import get_template, render_to_string
from django.template import Context

logger = logging.getLogger(__name__)


def open_file(file):
    return file.open('r')


def create_dataframe(instance):
    return pd.read_csv(open_file(instance.file), header=0)


def _run_import(instance, dry_run=False):
    print('--------------------------')
    df = create_dataframe(instance)
    dataset = Dataset().load(df)
    module = importlib.import_module('import_export_job.resources')
    resource = getattr(module, instance.resource)
    result = resource().import_data(dataset=dataset, dry_run=dry_run)

    rendered = render_to_string("import_result.html", {'result': result})

    instance.report = rendered
    if result.has_errors():
        instance.job_status = 'ERROR'
        instance.errors += "[DRY RUN] Failed to Import" if dry_run else "[COMMIT] Failed to Import"
    else:
        instance.job_status = "DRY RUN" if dry_run else "DONE"
    instance.save()


@shared_task
def run_import_job(pk):
    import_job = models.ImportJob.objects.get(pk=pk)
    try:
        _run_import(import_job, dry_run=True)
    except Exception as e:
        logger.error(
            "Some error occurred while deleting ImportJob file: {0}".format(e)
        )
        import_job.errors += "Import error %s" % e + "\n"
        import_job.job_status = 'ERROR'
        import_job.save()
        return
