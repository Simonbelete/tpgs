from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from notifications import views as notificationsView
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'unread', views.LiveUnreadNotificationList,
                basename='api_live_unread_notification_list')

router.register(r'all', views.LiveAllNotificationList,
                basename='api_live_all_notification_list')

urlpatterns = [
    path('inbox/notifications/', include([
        path('', include(router.urls)),
        path('mark-all-as-read/', views.MarkAllAsRead.as_view(), name='api_mark_all_as_read'),
        path('unread_count/', views.LiveUnreadNotificationCount.as_view(), name='api_live_unread_notification_count'),
        path('all_count/', views.LiveAllNotificationCount.as_view(), name='api_live_all_notification_count'),
    ])),  
]
