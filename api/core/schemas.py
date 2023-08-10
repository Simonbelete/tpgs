from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.openapi import AutoSchema


class TenantHeaderSchema(AutoSchema):
    def get_override_parameters(self):
        """ override this for custom behaviour """
        return [
            OpenApiParameter(
                name="X-Request-Id",
                type=str,
                location=OpenApiParameter.HEADER,
                description="Tenant/Farm default `public`",
            ),
            OpenApiParameter(
                name="X-Superuser-Mode",
                type=bool,
                location=OpenApiParameter.HEADER,
                description="Super user mode default `false`",
            )
        ]
