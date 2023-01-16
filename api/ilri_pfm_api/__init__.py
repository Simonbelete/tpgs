import os
from flask import Flask
from dotenv import load_dotenv

from .config import config_by_name
from .routes import *

# Routes
from .routes import test

def create_app() -> Flask:
    app = Flask(__name__)

    load_dotenv()

    load_config(app)
    init_database(app)
    app.register_blueprint(blueprint=blueprint, url_prefix="/api/v1")


    return app

def load_config(app: Flask) -> None:
    app.config.from_object(config_by_name[os.getenv('ENV', 'dev')])

def init_database(app: Flask) -> None:
    from .database import init
    
    init(app)