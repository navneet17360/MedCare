from extensions import db


class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialty = db.Column(db.String(100))
    years_experience = db.Column(db.Integer)
    hospital_name = db.Column(db.String(150))
    address = db.Column(db.Text)
    description = db.Column(db.Text)
    contact = db.Column(db.String(20))
    charges = db.Column(db.Integer)
    availability = db.Column(db.String(100))
    image_url = db.Column(db.String(255))
