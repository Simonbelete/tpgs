from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone
from simple_history.models import HistoricalRecords
from django.conf import settings

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
        extra_fields.setdefault("is_admin", False)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_approved", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_farmer", True)
        extra_fields.setdefault("is_active", True)

        # if extra_fields.get("is_farmer") is not True:
        #     raise ValueError(_("Superuser must have is_farmer=True."))
        # if extra_fields.get("is_superuser") is not True:
        #     raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)

    def create_adminuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_approved", True)
        extra_fields.setdefault("is_farmer", True)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_active", True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    objects = UserManager()

    username = models.CharField("username", max_length=150, unique=False, null=True, blank=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=250, null=True, blank=True)
    uid = models.CharField(max_length=250, null=True, blank=True)
    is_approved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_farmer = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
class Device(models.Model):
    token = models.CharField(max_length=250)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='devices')

class Farm(models.Model):
    name = models.CharField(max_length=250)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

class ChickenParent(models.Model):
    mother = models.ForeignKey('Chicken', on_delete=models.CASCADE, related_name='mother')
    father = models.ForeignKey('Chicken', on_delete=models.CASCADE, related_name='father')

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

## Chicken Stage (Chicken Life Cycle)
class ChickenStage(models.Model):
    name = models.CharField(max_length=250)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

## Breed Type
class BreedType(models.Model):
    name = models.CharField(max_length=250)
    color = models.CharField(max_length=10, null=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

    def __str__(self):
        return self.name


## Layed Place
class LayedPlace(models.Model):
    name = models.CharField(max_length=250)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

## Chicken/Animal
class Chicken(models.Model):
    SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )
    # Wing Tag
    tag = models.CharField(max_length=250)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES, default='M')
    house_no = models.IntegerField(null=True, blank=True)
    pen_no = models.IntegerField(null=True, blank=True)
    chicken_stage = models.ForeignKey(ChickenStage, on_delete=models.SET_NULL, null=True)
    breed_type = models.ForeignKey(BreedType, on_delete=models.SET_NULL, null=True)
    farm = models.ForeignKey(Farm, on_delete=models.SET_NULL, null=True)
    is_double_yolk = models.BooleanField(default=False)
    # date_of_hatch = models.DateField()
    layed_place = models.ForeignKey(LayedPlace, on_delete=models.SET_NULL, null=True)
    # eggs = models.ForeignKey('ChickenProgress', on_delete=models.SET_NULL, null=True, blank=True, '')

    parent = models.OneToOneField(ChickenParent, on_delete=models.SET_NULL, null=True, blank=True)
   
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()

class ChickenGrowth(models.Model):
    date = models.DateField()
    # In grams
    weight = models.DecimalField(max_digits = 6, decimal_places = 3, default=0)
    chicken = models.ForeignKey(Chicken, on_delete=models.SET_NULL, null=True, related_name='growth')
    # Compute Field
    week = models.IntegerField(default=0)

class ChickenProgress(models.Model):
    week = models.IntegerField(default=1)
    chicken = models.ForeignKey(Chicken, on_delete=models.CASCADE, related_name='progress')
    weight = models.DecimalField(max_digits = 6, decimal_places = 3, default=0)
    layed_eggs = models.ForeignKey(Chicken, on_delete=models.SET_NULL, null=True)

## Egg production
class Egg(models.Model):
    date = models.DateField()
    chicken = models.OneToOneField(Chicken, on_delete=models.CASCADE, primary_key=True)
    mother = models.ForeignKey(Chicken, on_delete=models.SET_NULL, null=True, related_name='children')
    is_double_yolk = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    history = HistoricalRecords()
