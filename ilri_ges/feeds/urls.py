from django.urls import path

from . import views

urlpatterns = [
    path('', views.FeedsView.as_view(), name='feeds'),
    path('delete/<int:id>/', views.FeedsDeleteView.as_view(), name='feeds_delete'),
    path('<int:id>/', views.FeedsEditView.as_view(), name='feeds_edit'),
    path('create', views.FeedsCreateView.as_view(), name='feeds_create'),
    path('types', views.FeedTypesView.as_view(), name='feeds_types'),
    path('types/<int:id>/', views.FeedTypesEditView.as_view(),
         name='feeds_types_edit'),
    path('types/delete/<int:id>/', views.FeedTypesDeleteView.as_view(),
         name='feeds_types_delete'),
    path('types/create', views.FeedTypesCreateView.as_view(),
         name='feeds_types_create'),
]
