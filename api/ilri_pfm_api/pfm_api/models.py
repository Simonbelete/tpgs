from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from django.db import models
from simple_history.models import HistoricalRecords
from django.utils import timezone

## User
# class UserManager(BaseUserManager):
#     """
#     Custom user model manager where email is the unique identifiers
#     for authentication instead of usernames.
#     """
#     def create_user(self, email, password, **extra_fields):
#         """
#         Create and save a User with the given email and password.
#         """
#         if not email:
#             raise ValueError(_('The Email must be set'))
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save()
#         return user

#     def create_superuser(self, email, password, **extra_fields):
#         """
#         Create and save a SuperUser with the given email and password.
#         """
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('is_active', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError(_('Superuser must have is_staff=True.'))
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError(_('Superuser must have is_superuser=True.'))

#         return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    email = models.EmailField(unique=True)

## Abstract Models
# class HistoryModel(models.Model):
#     created_by = models.ForeignKey(settings.AUTH_USER_MODEL,
#             on_delete=models.CASCADE)

#     class Meta:
#         abstract = True

# class BaseModel(models.Model):
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     # created_by = models.ForeignKey(settings.AUTH_USER_MODEL,
#     #   on_delete=models.CASCADE)
#     # history = HistoricalRecords(
#     #    bases=[HistoryModel]
#     # )

#     class Meta:
#         abstract = True

# class Farm(BaseModel):
#     name = models.CharField(max_length = 250)
#     code = models.CharField(max_length = 250)