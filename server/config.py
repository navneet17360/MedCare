# import os


# class Config:
#     SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:root@localhost/doctor_appointment_db'
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     SECRET_KEY = os.urandom(24)
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'doctor_appointment.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.urandom(24)