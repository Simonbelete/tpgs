from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from django.contrib.auth import password_validation
from rest_framework.response import Response
from rest_framework import viewsets

from . import serializers

class ChangePasswordViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.ChangePasswordSerializer

    def clean_old_password(self, old_password):
        """
        Validate that the old_password field is correct.
        """
        if not self.request.user.check_password(old_password):
            raise ValidationError(
                {
                    'old_password': ["Your old password was entered incorrectly. Please enter it again."]
                }
            )
        return old_password

    def clean_new_password(self, password1, password2):
        if password1 and password2 and password1 != password2:
            raise ValidationError(
                {
                    "new_password": ["The two password fields didn’t match."],
                    "confirm_password": ["The two password fields didn’t match."]
                }
            )
        password_validation.validate_password(password2, self.request.user)
        return password2
    
    def create(self, request):
        serializer = request.data
        self.clean_old_password(serializer['old_password'])
        self.clean_new_password(serializer['new_password'], serializer['confirm_password'])
        try:
            self.request.user.set_password(serializer['new_password'])
            return Response({}, status=200)
        except Exception as ex:
            return Response({}, status=500)