from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'units', views.UnitViewSet,
                basename='api_units'),
router.register(r'unit-converters', views.UnitConverterViewSet,
                basename='api_units_converter'),

urlpatterns = [
    path('', include(router.urls)),
]
