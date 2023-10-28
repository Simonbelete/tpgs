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
]
