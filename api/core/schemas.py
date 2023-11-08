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
            ),
            # OpenApiParameter(
            #     name="depth",
            #     type=int,
            #     location=OpenApiParameter.QUERY,
            #     description="Depth default `0`",
            # )
        ]


ANALYSES_PARAMETERS = [
    OpenApiParameter(
        name='chicken',
        description='chicken',
        location=OpenApiParameter.QUERY,
        required=False,
        type=int),
    OpenApiParameter(
        name='start_week',
        description='Start Week',
        location=OpenApiParameter.QUERY,
        required=True,
        default=21,
        type=int),
    OpenApiParameter(
        name='end_week',
        description='End Week',
        location=OpenApiParameter.QUERY,
        required=True,
        default=41,
        type=int),
    OpenApiParameter(
        name='farm',
        description='farm',
        location=OpenApiParameter.QUERY,
        required=False,
        type=int),
    OpenApiParameter(
        name='breed',
        description='Breed id',
        location=OpenApiParameter.QUERY,
        required=False,
        type=int),
    OpenApiParameter(
        name='generation',
        description='Generation',
        location=OpenApiParameter.QUERY,
        required=False,
        type=int),
    OpenApiParameter(
        name='hatchery',
        description='Hatchery',
        location=OpenApiParameter.QUERY,
        required=False,
        type=int),
    OpenApiParameter(
        name='house',
        description='House',
        location=OpenApiParameter.QUERY,
        required=False,
        type=int),
    OpenApiParameter(
        name='pen',
        description='Pen',
        location=OpenApiParameter.QUERY,
        required=False,
        type=int),
    OpenApiParameter(
        name='sex',
        description='Sex M | F',
        location=OpenApiParameter.QUERY,
        required=False,
        type=str),
]
