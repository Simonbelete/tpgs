from flask import Blueprint
from flask_restx import fields, Api, Resource, Namespace


blueprint = Blueprint('mainapiv1', __name__)

api_v1 = Api(
    blueprint,
    title = 'ILRI PFM Version 1 API',
    version = '1.0.0',
    description = '',
)