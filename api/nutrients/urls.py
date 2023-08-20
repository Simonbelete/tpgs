from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'nutrients', views.NutrientViewSet,
                basename='api_nutrients'),
router.register(r'nutrient-groups', views.NutrientGroupViewSet,
                basename='api_nutrients_groups'),
router.register(r'nutrient-groups/(?P<id>.+)/histories',
                views.NutrientGroupHistoryViewSet, basename='api_nutrients_groups_histories'),


urlpatterns = [
    path('', include(router.urls)),

    # Nutrient Group
    path('nutrient-groups/export/', include([
        path('xlsx', views.NutrientGroupXlsxExport.as_view(),
             name="nutrient_groups_export_xlsx"),
        path('xls', views.NutrientGroupXlsExport.as_view(),
             name="nutrient_groups_export_xls"),
        path('csv', views.NutrientGroupCsvExport.as_view(),
             name="nutrient_groups_export_csv"),
    ])),

    path('nutrient-groups/import/', include([
        path('xlsx', views.NutrientGroupXlsxImport.as_view(),
             name="nutrient_groups_import_xlsx"),
        path('xls', views.NutrientGroupXlsImport.as_view(),
             name="nutrient_groups_import_xls"),
        path('csv', views.NutrientGroupCsvImport.as_view(),
             name="nutrient_groups_import_csv")
    ])),

    # Nutrients
    path('nutrients/export/', include([
         path('xlsx', views.NutrientXlsxExport.as_view(),
              name="nutrients_export_xlsx"),
         path('xls', views.NutrientXlsExport.as_view(),
              name="nutrients_export_xls"),
         path('csv', views.NutrientCsvExport.as_view(),
              name="nutrients_export_csv"),
         ])),

    path('nutrients/import/', include([
        path('xlsx', views.NutrientXlsxImport.as_view(),
             name="nutrients_import_xlsx"),
        path('xls', views.NutrientXlsImport.as_view(),
             name="nutrients_import_xls"),
        path('csv', views.NutrientCsvImport.as_view(),
             name="nutrients_import_csv")
    ]))
]
