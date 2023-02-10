from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from simple_history.models import HistoricalRecords
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    objects = UserManager()

    username = models.CharField(
        "username", max_length=150, unique=False, null=True, blank=True)
    email = models.EmailField(
        verbose_name='email address', max_length=255, unique=True,)
    name = models.CharField(max_length=250, null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

    class Meta:
        ordering = ["name"]
        verbose_name_plural = 'countries'

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=100, unique=True)
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name='cities')

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

    class Meta:
        ordering = ["name"]
        verbose_name_plural = 'cities'

    def __str__(self):
        return f'{self.country.name} - {self.name}'


class Farm(models.Model):
    name = models.CharField(max_length=250)
    city = models.ForeignKey(
        City, on_delete=models.SET_NULL, null=True, related_name='farms')

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

    class Meta:
        ordering = ["name"]
        verbose_name_plural = 'farms'

    def __str__(self):
        return self.name


class House(models.Model):
    name = models.CharField(max_length=10)
    farm = models.ForeignKey(
        Farm, on_delete=models.SET_NULL, null=True, related_name='houses')

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

    class Meta:
        ordering = ["name"]
        verbose_name_plural = 'houses'

    def __str__(self):
        return self.name


class BreedType(models.Model):
    name = models.CharField(max_length=250)
    color = models.CharField(max_length=10, null=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

    def __str__(self):
        return self.name


class Stage(models.Model):
    name = models.CharField(max_length=250)
    min_week = models.IntegerField()
    max_week = models.IntegerField()

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()


# class Chicken(models.Model):
#     SEX_CHOICES = (
#         ('F', 'Female',),
#         ('M', 'Male',),
#     )

#     tag = models.CharField(max_length=250)
#     sex = models.CharField(max_length=1, choices=SEX_CHOICES, default='')

#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     created_by = models.ForeignKey(
#         settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
#     history = HistoricalRecords()
