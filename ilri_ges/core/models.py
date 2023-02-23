from django.db import models
from django.conf import settings


class BaseTimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseUserTrackedModel(models.Model):
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    class Meta:
        abstract = True


class BaseDeleteModel(models.Model):
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
