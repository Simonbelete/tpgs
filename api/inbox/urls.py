from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from notifications import views as notificationsView
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'unread', views.LiveUnreadNotificationList,
                basename='api_live_unread_notification_list')

urlpatterns = [
    path('inbox/notifications/', include([
        path('unread_count', views.LiveUnreadNotificationCount.as_view(), name='live_unread_notification_count'),
        path('all_count', views.LiveAllNotificationCount.as_view(), name='live_all_notification_count'),
        path('', include(router.urls))
    ])),  
]
