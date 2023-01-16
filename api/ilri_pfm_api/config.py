import os

class Config:
    DEBUG = False
    TESTING = False

class DevConfig(Config):
    pass

config_by_name = dict(
    dev=DevConfig
)