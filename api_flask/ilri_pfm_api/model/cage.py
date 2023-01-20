from ilri_pfm_api.db import db

class Cage(db.Model):
    __tablename__ = 'cage'

    house_no = db.Column(db.String(), nullable=False)
    pen_no = db.Column(db.String(), nullable=False)
    chickens = db.relationship('Chicken')