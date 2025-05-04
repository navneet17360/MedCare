from extensions import db


class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False)

    doctor = db.relationship('Doctor', backref=db.backref('appointments', lazy=True))
