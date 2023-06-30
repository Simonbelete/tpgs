from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import Group
from django_tenants.models import TenantMixin, DomainMixin

from farms.models import Farm


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

        # Set User Groups
        # farmer_group = Group.objects.get(name='farmer')
        # farmer_group.user_set.add(user)

        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)

        return self.create_user(email, password, ** extra_fields)


class User(AbstractUser):
    objects = UserManager()

    username = models.CharField(
        "username", max_length=150, unique=False, null=True, blank=True)
    email = models.EmailField(
        verbose_name='email address', max_length=255, unique=True,)
    name = models.CharField(max_length=250, null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    farms = models.ManyToManyField(Farm, blank=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
