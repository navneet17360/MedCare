import random
from datetime import datetime, timedelta

from app import create_app, db
from faker import Faker
from models.appointment import Appointment
from models.doctor import Doctor
from models.patient import Patient

fake = Faker()
doctors_data = [
    {
        "name": "Tarun Mathur",
        "specialty": "Neurology",
        "years_experience": 9,
        "hospital_name": "G B H American Hospital",
        "address": "101, Meera Girls, College Road, Kothi Bagh, Bhatt Ji ki Bari, Udaipur",
        "description": "One of the most prolific neurologists in Udaipur.",
        "contact": "+91 2943056000",
        "charges": 1000,
        "availability": "Mon-Sat 10:00 AM–2:00 PM, 6:00 PM–7:30 PM",
        "image_url":"https://parashospitals-web.s3.ap-south-1.amazonaws.com/doctor-lists/May2024/RJ-UDP-00581.jpg"
    },
    {
        "name": "Huma Gauri",
        "specialty": "Neurology",
        "years_experience": 2,
        "hospital_name": "Geetanjali Medical College",
        "address": "Udaipur City, Udaipur, Rajasthan",
        "description": "Promising new neurologist, MBBS from Udaipur (2016).",
        "contact": "+91 2943056007",
        "charges": 300,
        "availability": "Mon-Tue 7:00 PM–9:00 PM, Wed 8:00 AM–9:00 AM",
        "image_url":"Not-available"
    },
    {
        "name": "A K Vats",
        "specialty": "Neurology",
        "years_experience": 15,
        "hospital_name": "Own Clinic",
        "address": "6-A, B Block, Shikarbadi, Goverdhan Villas, Near Inder Residency Hotel, Udaipur",
        "description": "Prominent neurologist with vast experience.",
        "contact": "+91 9152577761",
        "charges": 250,
        "availability": "Mon-Sat 10:00 AM–1:00 PM",
        "image_url":"https://content.jdmagicbox.com/comp/udaipur-rajasthan/q7/9999pxxxx.xxxx.100901073826.s3q7/catalogue/dr-a-k-vats-goverdhan-villas-udaipur-rajasthan-neurologists-tqwrup.jpg"
    },
    {
        "name": "Pankaj Gandhi",
        "specialty": "Neurology",
        "years_experience": 5,
        "hospital_name": "Own Clinic",
        "address": "A 35, New Ahinsa Puri, Fatehpura, opp. Pava Vihar Vatika, Udaipur",
        "description": "Well-known and available even on Sundays.",
        "contact": "+91 9152655363",
        "charges": 300,
        "availability": "Mon-Sun 8:30 AM–7:30 PM",
        "image_url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZzS0TKXmahSfF5dOhnGE77QHWc0SshzOsu2YVsH-rLKITUc_9C-t_mOE&usqp=CAE&s"
    },
    {
        "name": "Nikunj R Godhani",
        "specialty": "Neurology",
        "years_experience": 17,
        "hospital_name": "Krunesh Neuro and Spine Hospital",
        "address": "Near Raghu Mahal Hotel, Central Area, Udaipur",
        "description": "Famous for neuro and spine expertise.",
        "contact": "+91 9152748146",
        "charges": 350,
        "availability": "Mon-Sat 8:00 AM–1:00 PM, 4:00 PM–7:00 PM",
        "image_url":"https://medsurgeindia.com/wp-content/uploads/2024/06/Dr.-Nikunj-R-Godhani.webp"
    },
    {
        "name": "Tarun Kumar Ralot",
        "specialty": "Neurology",
        "years_experience": 11,
        "hospital_name": "Own Clinic (Inside Civil Hospital Campus)",
        "address": "Quarter no. D 2, Inside Civil Hospital Campus, near Girls hostel and Nursing College, Chetak Circle, Udaipur",
        "description": "Respected neurologist within Civil Hospital campus.",
        "contact": "+91 9468967338",
        "charges": 300,
        "availability": "Mon-Sat 3:00 PM–8:00 PM",
        "image_url":"https://tarunralot.carrd.co/assets/images/image01.jpg?v=90f69ee6"
    },
    {
        "name": "A A Saifee",
        "specialty": "Neurology",
        "years_experience": 10,
        "hospital_name": "Geetanjali Hospital",
        "address": "10 F, Fatehpura, Near Sewa Mandir, Udaipur City, Udaipur",
        "description": "Experienced neurologist serving Hiran Magri area.",
        "contact": "+91 9414284971",
        "charges": 250,
        "availability": "Mon-Sat 3:00 PM–6:00 PM",
        "image_url":"https://content.jdmagicbox.com/comp/udaipur-rajasthan/y3/9999px294.x294.170724145731.e8y3/catalogue/dr-a-a-saifee-geetanjali-hospital--hiran-magri-udaipur-rajasthan-neurologists-riANjZK36w.jpg"
    },
    {
        "name": "Mayanka Seth",
        "specialty": "Neurology",
        "years_experience": 14,
        "hospital_name": "Medicare Sonography and Clinical Lab",
        "address": "Shop no. 7, Ground Floor, Shri Nath Complex, Udaipur",
        "description": "Expert in neuro diagnostics and clinical assessments.",
        "contact": "+91 7665000234",
        "charges": 300,
        "availability": "Mon-Sat 9:30 AM–6:30 PM",
        "image_url":"https://content.jdmagicbox.com/comp/udaipur-rajasthan/n0/9999px294.x294.150803170509.d1n0/catalogue/dr-mayanka-seth-medicentre-sonography-and-clinical-lab--udaipur-city-udaipur-rajasthan-radiologist-doctors-36mp4ycn4s.jpg"
    },
    {
        "name": "Renu Khamesra",
        "specialty": "Neurology",
        "years_experience": 13,
        "hospital_name": "Geetanjali Hospital",
        "address": "Hiran Magri, Manwakhera, Near Goverdhan Villas, Udaipur",
        "description": "One of the top-rated neurologists in Udaipur.",
        "contact": "+91 2942500007",
        "charges": 350,
        "availability": "Mon-Sat 9:00 AM–3:00 PM",
        "image_url":"https://aiimsudr.ac.in/wp-content/uploads/2023/02/Dr.renujpg.jpg"
    },
    {
        "name": "Vishal Jogi",
        "specialty": "Neurology",
        "years_experience": 19,
        "hospital_name": "Arpan Neurology Centre",
        "address": "B 407, opp. Helmet Circle, near May Flower Hospital and Manav Mandir, Udaipur",
        "description": "Senior neurologist with extensive experience.",
        "contact": "+91 8469865577",
        "charges": 300,
        "availability": "Mon-Sat 11:30 AM–1:30 PM, 5:00 PM–8:00 PM",
        "image_url":"https://content.jdmagicbox.com/comp/udaipur-rajasthan/v2/9999px294.x294.160921214540.g5v2/catalogue/dr-vishal-jogi-udaipur-city-udaipur-rajasthan-neurologists-3yem611.jpg"
    },
]
app = create_app()

with app.app_context():
    Appointment.query.delete()
    Patient.query.delete()
    Doctor.query.delete()
    db.session.commit()

    doctors = []
    for doc_data in doctors_data:
        doctor = Doctor(**doc_data)
        db.session.add(doctor)
        doctors.append(doctor)

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