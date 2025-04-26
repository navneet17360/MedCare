import random
from datetime import datetime, timedelta

from faker import Faker

from app import create_app, db
from models.appointment import Appointment
from models.doctor import Doctor
from models.patient import Patient

fake = Faker()

app = create_app()

with app.app_context():
    Appointment.query.delete()
    Patient.query.delete()
    Doctor.query.delete()
    db.session.commit()

    doctors = []
    for _ in range(5):
        doctor = Doctor(
            name=fake.name(),
            email=fake.unique.email(),
            specialty=random.choice(['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General']),
            phone=fake.phone_number()
        )
        doctors.append(doctor)
        db.session.add(doctor)

    patients = []
    for _ in range(10):
        patient = Patient(
            name=fake.name(),
            email=fake.unique.email(),
            phone=fake.phone_number(),
            age=random.randint(1, 90)
        )
        patients.append(patient)
        db.session.add(patient)

    db.session.commit()

    for _ in range(15):
        appointment = Appointment(
            date=fake.date_between(start_date='-30d', end_date='+30d'),
            time=(datetime.now() + timedelta(minutes=random.randint(0, 1440))).time(),
            doctor_id=random.choice(doctors).id,
            patient_id=random.choice(patients).id,
            status=random.choice(['pending', 'confirmed', 'cancelled'])
        )
        db.session.add(appointment)

    db.session.commit()

    print("Dummy data seeded successfully!")