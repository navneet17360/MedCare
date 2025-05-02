from flask import Flask
from flask_cors import CORS  # Import CORS
from config import Config
from extensions import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize CORS
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow React frontend origin

    db.init_app(app)

    # Import and register blueprints
    from routes.appointment_routes import appointment_bp
    from routes.doctor_routes import doctor_bp
    from routes.patient_routes import patient_bp

    app.register_blueprint(doctor_bp, url_prefix='/api/doctors')
    app.register_blueprint(patient_bp, url_prefix='/api/patients')
    app.register_blueprint(appointment_bp, url_prefix='/api/appointments')

    @app.route('/')
    def index():
        return {'message': 'Doctor Appointment API is running.'}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)