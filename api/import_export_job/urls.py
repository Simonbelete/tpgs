from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

router.register(r'import/jobs', views.ImportJobViewSet,
                basename='api_import_jobs')

router.register(r'export/jobs', views.ExportJobViewSet,
                basename='api_export_jobs')

urlpatterns = [
    path('', include(router.urls))
]
