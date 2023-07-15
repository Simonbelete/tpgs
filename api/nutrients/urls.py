from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'nutrients', views.NutrientViewSet,
                basename='api_nutrients'),
router.register(r'nutrient-groups', views.NutrientGroupViewSet,
                basename='api_nutrients_groups'),

urlpatterns = [
    path('', include(router.urls)),
    #
    # Nutrient Group
    #

    # Xlsx
    path('nutrient-groups/export/xlsx', views.NutrientGroupXlsxExport.as_view(),
         name="nutrient_groups_export_xlsx"),
    path('nutrient-groups/import/xlsx', views.NutrientGroupXlsxImport.as_view(),
         name="nutrient_groups_import_xlsx"),
    # Xls
    path('nutrient-groups/export/xls', views.NutrientGroupXlsExport.as_view(),
         name="nutrient_groups_export_xls"),
    path('nutrient-groups/import/xls', views.NutrientGroupXlsImport.as_view(),
         name="nutrient_groups_import_xls"),
    # Csv
    path('nutrient-groups/export/csv', views.NutrientGroupCsvExport.as_view(),
         name="nutrient_groups_export_csv"),
    path('nutrient-groups/import/csv', views.NutrientGroupCsvImport.as_view(),
         name="nutrient_groups_import_csv")
]
