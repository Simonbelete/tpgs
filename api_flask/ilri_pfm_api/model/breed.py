from ilri_pfm_api.db import db

class Breed(db.Model):
    __tablename__ = 'breed'

    name = db.Column(db.String(), nullable=False)
    