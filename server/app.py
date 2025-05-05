from config import Config
from extensions import db
from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
   
    # Configure CORS for the frontend origin
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
   
    db.init_app(app)
 
    # Disable strict slashes globally to prevent redirects
    app.url_map.strict_slashes = False
 
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
    app.run(host='0.0.0.0', port=5000, debug=True)