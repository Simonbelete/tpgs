import numpy as np
import pandas as pd
from celery import shared_task
from django_tenants.utils import get_tenant_model, get_tenant_domain_model
from django_tenants.utils import schema_context
from sklearn.ensemble import IsolationForest

from feeds.models import Feed


@shared_task
def generate_breed_anomaly(x, y):
    tenants = get_tenant_model().objects.all()

    for tenant in tenants.iterator():
        with schema_context(tenant):
            df = pd.DataFrame(
                Feed.objects.all().values('id', 'week', 'weight')
            )
            week_group = df.groupby('week')

            for i, group in week_group:
                isolation_model = IsolationForest(contamination=float(0.1))
                isolation_model.fit(group[['weight']].values)
