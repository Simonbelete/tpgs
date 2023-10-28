from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'requirements', views.RequirementViewSet,
                basename='api_requirement'),

router.register(r'requirements/(?P<id>.+)/analyses', views.RequirementAnalysesViewSet,
                basename='api_requirement_analyses')
                
router.register(r'requirements/(?P<id>.+)/histories',
                views.RequirementHistoryViewSet, basename='api_requirement_histories'),

summary_router = NestedDefaultRouter(
    router, r'requirements', lookup='id')
summary_router.register(r'summary', views.RequirementSummaryViewSet,
                        basename='api_requirement_summary')

nutrient_router = NestedDefaultRouter(
    router, r'requirements', lookup='requirement')
nutrient_router.register(r'nutrients', views.RequirementNutrientViewSet,
                            basename='api_requirement_nutrients')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),
    path('', include(nutrient_router.urls)),
    
    path('requirements/export/', include([
        path('xlsx', views.RequirementXlsxExport.as_view(),
             name="requirement_export_xlsx"),
        path('xls', views.RequirementXlsExport.as_view(),
             name="requirement_export_xls"),
        path('csv', views.RequirementCsvExport.as_view(),
              name="requirement_export_csv"),
    ])),

    path('requirements/import/', include([
         path('xlsx', views.RequirementXlsxImport.as_view(),
              name="requirement_import_xlsx"),
         path('xls', views.RequirementXlsImport.as_view(),
              name="requirement_import_xls"),
         path('csv', views.RequirementCsvImport.as_view(),
              name="requirement_import_csv")
    ]))
]
