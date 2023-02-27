from rest_framework import viewsets
from django.contrib.auth.models import Group

from users.models import User
from users.api.serializers import UserSerializer_GET_V1, GroupSerializer_GET_V1


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer_GET_V1


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer_GET_V1
