from ilri_pfm_api.db import db

class Chicken(db.Model):
    __tablename__ = 'chicken'

    tag = db.Column(db.String(), unique = True, nullable = False)
    sire_id = db.mapped_column(db.Integer(), db.Foreignkey('chicken.id'))
    dam_id = db.mapped_column(db.Integer(), db.Foreignkey('chicken.id'))
    cage_id = db.Column(db.Integer(), db.Foreignkey('cage.id'))
    sex = db.Column(db.Enum('male', 'female', name='sex_enum'))
    layed_place = db.Column(db.Enum('Out Nest', 'In Nest', name='layed_place'))