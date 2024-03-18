"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from notifications import views as notificationsView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from units.urls import router
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


from django.views.decorators.cache import never_cache
from django.http import JsonResponse
from rest_framework.views import APIView
from django.conf import settings

urlpatterns = [
    path('api-v1/', include([
        path('admin/', admin.site.urls),
        path('activity/', include('actstream.urls')),
        path('token/', TokenObtainPairView.as_view(),
             name='token_obtain_pair'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
        path('', include('users.urls')),
        path('', include('auths.urls')),
        path('', include('flocks.urls')),
        path('', include('units.urls')),
        path('', include('nutrients.urls')),
        path('', include('ingredients.urls')),
        path('', include('farms.urls')),
        path('', include('currency.urls')),
        path('', include('invitations.urls')),
        path('', include('contact.urls')),
        path('', include('stages.urls')),
        path('', include('breeds.urls')),
        path('', include('chickens.urls')),
        path('', include('eggs.urls')),
        path('', include('feeds.urls')),
        path('', include('weights.urls')),
        path('', include('purposes.urls')),
        path('', include('formulas.urls')),
        path('', include('houses.urls')),
        path('', include('pen.urls')),
        path('', include('analyses.urls')),
        path('', include('reduction_reason.urls')),
        path('', include('inbox.urls')),
        path('', include('hatchery.urls')),
        path('', include('requirements.urls')),
        path('', include('city.urls')),
        path('', include('import_export_job.urls')),
        path('', include('activity.urls')),
        path('schema/', SpectacularAPIView.as_view(), name='schema'),
        # Optional UI:
        path('schema/swagger-ui/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
        path('schema/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    ])),
]
