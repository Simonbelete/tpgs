import os
from dotenv import load_dotenv

class Config:
    load_dotenv()

    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')

class DevConfig(Config):
    pass

config_by_name = dict(
    dev=DevConfig
)