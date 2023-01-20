from flask_restx import Namespace, Resource,fields
from flask import request, jsonify, make_response
from . import api_v1

api = Namespace('chicken', description='Chicken API')

api_v1.add_namespace(api, path='/chickens')

@api.route('/')
class ChickenList(Resource):
    def get(self):
        limit = int(request.args.get('limit', self._LIMIT))
        page = int(request.args.get('page', 1 ))
        offset = (page - 1) * limit