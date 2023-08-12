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
from django.urls import path, include
import notifications.urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from units.urls import router
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/activity/', include('actstream.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/inbox/notifications/',
         include(notifications.urls, namespace='notifications')),
    path('adminactions/', include('adminactions.urls')),
    path('api/', include([
        path('', include('cities_light.contrib.restframework3')),
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
        path('', include('analyses.urls')),
    ])),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
