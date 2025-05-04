# init_db.py

from app import create_app
from extensions import db
from models.appointment import Appointment
# Import your models so SQLAlchemy knows about them
from models.doctor import Doctor

# Create the Flask app context
app = create_app()

with app.app_context():
    db.create_all()
    print("✅ Database tables created successfully.")
