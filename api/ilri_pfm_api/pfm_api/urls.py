from django.urls import include, path

urlpatterns = [
    path('v1/', include('pfm_api.v1.urls'))
]