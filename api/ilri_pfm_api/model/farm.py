from ilri_pfm_api.db import db

class Farm(db.Model):
    __tablename__ = 'farm'

    name = db.Column(db.String(), nullable=False)