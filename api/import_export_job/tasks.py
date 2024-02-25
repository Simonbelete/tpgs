from celery import shared_task
import pandas as pd
from tablib import Dataset
import importlib

from . import models


def open_file(file):
    return file.open('r')


def create_dataframe(instance):
    return pd.read_csv(open_file(instance.file), header=0)


def _run_dry_run_import(instance):
    df = create_dataframe(instance)
    dataset = Dataset().load(df)
    module = importlib.import_module('import_export.resources')
    resource = getattr(module, instance.resource)
    result = resource.import_data(dataset, dry_run=True)

    if result.has_errors():
        raise result


def _run_commit_import(instance):
    pass


@shared_task
def run_import_job(pk):
    import_job = models.ImportJob.objects.get(pk=pk)
    try:
        _run_dry_run_import()
        _run_commit_import()
    except Exception as e:
        import_job.errors += "Import error %s" % e + "\n"
        import_job.job_status = 'ERROR'
        import_job.save()
        return
