from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'hatchery', views.HatcheryViewSet,
                basename='api_hatchery')

hatchery_egg_router = NestedDefaultRouter(
    router, r'hatchery', lookup='hatchery')
hatchery_egg_router.register(r'eggs', views.HatcherysEggViewSet,
                            basename='api_hatchery_eggs')

eggs_router = routers.DefaultRouter()
eggs_router.register(r'hatchery-eggs', views.HatcheryEggViewSet,
                basename='api_hatchery_eggs_list')

hatchery_incubation_router = NestedDefaultRouter(
    router, r'hatchery', lookup='hatchery')
hatchery_incubation_router.register(r'incubations', views.HatcheryIncubationViewSet,
                            basename='api_hatchery_incubation')

incubations_router = routers.DefaultRouter()
incubations_router.register(r'incubations', views.IncubationViewSet,
                basename='api_incubation_list')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(hatchery_egg_router.urls)),
    path('', include(eggs_router.urls)),
    path('', include(incubations_router.urls)),
    path('', include(hatchery_incubation_router.urls)),
    
    path('incubations/export/', include([
          path('xlsx', views.IncubationXlsxExport.as_view(),
              name="incubations_export_xlsx"),
          path('xls', views.IncubationXlsExport.as_view(),
               name="incubations_export_xls"),
          path('csv', views.IncubationCsvExport.as_view(),
               name="incubations_export_csv"),
     ])),

     path('incubations/import/', include([
          path('xlsx', views.HatcheryEggsXlsxImport.as_view(),
              name="incubations_import_xlsx"),
          path('xls', views.HatcheryEggsXlsImport.as_view(),
               name="incubations_import_xls"),
          path('csv', views.HatcheryEggsCsvImport.as_view(),
               name="incubations_import_csv")
    ])),
     
     path('hatchery-eggs/export/', include([
          path('xlsx', views.HatcheryEggsXlsxExport.as_view(),
              name="hatchery_eggs_export_xlsx"),
          path('xls', views.HatcheryEggsXlsExport.as_view(),
               name="hatchery_eggs_export_xls"),
          path('csv', views.HatcheryEggsCsvExport.as_view(),
               name="hatchery_eggs_export_csv"),
     ])),

     path('hatchery-eggs/import/', include([
          path('xlsx', views.HatcheryEggsXlsxImport.as_view(),
              name="hatchery_eggs_import_xlsx"),
          path('xls', views.HatcheryEggsXlsImport.as_view(),
               name="hatchery_eggs_import_xls"),
          path('csv', views.HatcheryEggsCsvImport.as_view(),
               name="hatchery_eggs_import_csv")
    ])),
]