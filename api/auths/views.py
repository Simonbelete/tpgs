from django.shortcuts import render
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from django.contrib.auth import password_validation
from rest_framework.response import Response

from . import serializers

class ChangePasswordViewSet(APIView):
    serializer_class = serializers.ChangePasswordSerializer

    def clean_old_password(self, old_password):
        """
        Validate that the old_password field is correct.
        """
        if not self.user.check_password(old_password):
            raise ValidationError(
                "Your old password was entered incorrectly. Please enter it again.",
                code="password_incorrect",
            )
        return old_password

    def clean_new_password(self, password1, password2):
        if password1 and password2 and password1 != password2:
            raise ValidationError(
                self.error_messages["password_mismatch"],
                code="password_mismatch",
            )
        password_validation.validate_password(password2, self.user)
        return password2
    
    def post(self, request):
        data = self.serializer_class(request.data)
        self.clean_old_password(data.old_password)
        self.clean_new_password(data.new_password, data.confirm_password)
        try:
            self.request.user.set_password(data.new_password)
            return Response({}, status=200)
        except Exception as ex:
            return Response({}, status=500)