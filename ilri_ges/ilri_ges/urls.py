"""ilri_ges URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.conf.urls import handler404, handler500

from .views import index, playground_d3js, page404, page500, error_404, error_500

urlpatterns = [
    path('', index, name='index'),
    path('users/', include('users.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('breeds/', include('breeds.urls')),
    path('weights/', include('weights.urls')),
    path('chickens/', include('chickens.urls')),
    path('breeding-pairs/', include('breeding_pairs.urls')),
    path('locations/', include('locations.urls')),
    path('farms/', include('farms.urls')),
    path('feeds/', include('feeds.urls')),
    path('eggs/', include('eggs.urls')),
    path('flocks/', include('flocks.urls')),
    path('hatchery/', include('hatchery.urls')),
    path('admin/', admin.site.urls),

    path('api/', include('breeds.api.urls')),
    path('api/', include('chickens.api.urls')),
    path('api/', include('users.api.urls')),
    path('api/', include('breeding_pairs.api.urls')),
    path('api/', include('locations.api.urls')),
    path('api/', include('farms.api.urls')),
    path('api/', include('feeds.api.urls')),
    path('api/', include('eggs.api.urls')),
    path('api/', include('weights.api.urls')),
    path('api/', include('flocks.api.urls')),
    path('api/', include('hatchery.api.urls')),

    path('chickens/api/', include('chickens.api.urls')),

    path('playgrounds/d3js', playground_d3js, name='playground_d3js'),
    path('404', page404, name='404'),
    path('500', page500, name='500')
]

handler404 = error_404
handler500 = error_500
