from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

router.register(r'import/jobs', views.ImportJobViewSet,
                basename='api_import_jobs')

urlpatterns = [
    path('', include(router.urls))
]
