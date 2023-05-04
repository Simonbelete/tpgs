from django.db import models
from django.conf import settings


class BaseDeleteManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


class BaseAllDataManger(models.Manager):
    def get_queryset(self):
        return super().get_queryset().all()


class BaseTimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    # updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseUserTrackedModel(models.Model):
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, null=True)

    class Meta:
        abstract = True


class BaseDeleteModel(models.Model):
    objects = BaseDeleteManager()
    all = BaseAllDataManger()
    all_objects = models.Manager()

    is_active = models.BooleanField(default=True)

    def trash(self):
        self.is_active = False
        self.save()

    def restore(self):
        self.is_active = True
        self.save()

    class Meta:
        abstract = True


class CoreModel(BaseTimestampedModel, BaseUserTrackedModel, BaseDeleteModel):
    class Meta:
        abstract = True
