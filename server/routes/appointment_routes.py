from datetime import datetime

from extensions import db
from flask import Blueprint, jsonify, request
from models.appointment import Appointment

appointment_bp = Blueprint('appointment_bp', __name__)
 
@appointment_bp.route('/', methods=['GET', 'POST', 'OPTIONS'])
def appointments():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        return response, 200
 
    if request.method == 'GET':
        appointments = Appointment.query.all()
        return jsonify([
            {
                'id': a.id,
                'patient_name': a.patient_name,
                'date': a.date.isoformat(),
                'time': a.time.strftime('%H:%M'),
                'doctor_id': a.doctor_id,
                'status': a.status
            }
            for a in appointments
        ])
 
    if request.method == 'POST':
        try:
            data = request.get_json()
            if not data or not all(key in data for key in ['patient_name', 'date', 'time', 'doctor_id']):
                return jsonify({'error': 'Missing required fields'}), 400
 
            new_appointment = Appointment(
                patient_name=data['patient_name'],
                date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
                time=datetime.strptime(data['time'], '%H:%M').time(),
                doctor_id=data['doctor_id'],
                status='Scheduled'
            )
            db.session.add(new_appointment)
            db.session.commit()
            return jsonify({
                'message': 'Appointment booked successfully',
                'appointment_id': new_appointment.id
            }), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
 
@appointment_bp.route('/<int:id>', methods=['PUT', 'OPTIONS'])
def update_appointment(id):
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Methods', 'PUT, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        return response, 200
 
    appointment = Appointment.query.get_or_404(id)
    data = request.get_json()
    if 'patient_name' in data:
        appointment.patient_name = data['patient_name']
    if 'date' in data:
        appointment.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    if 'time' in data:
        appointment.time = datetime.strptime(data['time'], '%H:%M').time()
    if 'doctor_id' in data:
        appointment.doctor_id = data['doctor_id']
    if 'status' in data:
        appointment.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Appointment updated successfully'})
 
@appointment_bp.route('/<int:id>', methods=['DELETE', 'OPTIONS'])
def delete_appointment(id):
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Methods', 'DELETE, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        return response, 200
 
    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({'message': 'Appointment deleted successfully'})