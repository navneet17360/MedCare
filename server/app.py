from config import Config
from extensions import db  # <<< Import from extensions
from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)  # <<< Important

    # Import and register blueprints
    from routes.appointment_routes import appointment_bp
    from routes.contact_routes import contact_bp
    from routes.doctor_routes import doctor_bp

    app.register_blueprint(doctor_bp, url_prefix='/api/doctors')
    app.register_blueprint(appointment_bp, url_prefix='/api/appointments')
    app.register_blueprint(contact_bp, url_prefix='/api/contact-us')

    @app.route('/')
    def index():
        return {'message': 'Doctor Appointment API is running.'}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
