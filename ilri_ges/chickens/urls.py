from django.urls import path

from . import views

urlpatterns = [
    path('', views.ChickenView.as_view(), name="chickens"),
    path('delete/<int:id>/', views.ChickenDeleteView.as_view(),
         name="chickens_delete"),
    path('<int:id>/', views.ChickenEditView.as_view(), name="chickens_edit"),
    path('<int:id>/eggs', views.ChickenEgg.as_view(), name="chickens_eggs"),
    path('<int:id>/feeds', views.ChickenFeed.as_view(), name="chickens_feeds"),
    path('<int:id>/weights', views.ChickenWeights.as_view(),
         name="chickens_weights"),
    path('<int:id>/breeding', views.ChickenPartners.as_view(),
         name="chickens_breeding"),
    path('<int:id>/offsprings', views.ChickenOffsprings.as_view(),
         name="chickens_offsprings"),
    path('<int:id>/state', views.ChickenStateView.as_view(),
         name="chickens_state_edit"),
    path('create', views.ChickenCreateView.as_view(), name="chickens_create"),
    path('import', views.ChickenImportView.as_view(), name="chickens_import"),
    path('export', views.ChickenExportView.as_view(), name="chickens_export"),
    path('feed-by-weight', views.ChickensReportFeedByWeight.as_view(),
         name="chickens_feed_by_weight")
]
