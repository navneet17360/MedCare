from datetime import datetime

from app import db
from flask import Blueprint, jsonify, request
from models.appointment import Appointment

appointment_bp = Blueprint('appointment_bp', __name__)

@appointment_bp.route('/', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    return jsonify([
        {
            'id': a.id,
            'patient_name': a.patient_name,
            'date': a.date.isoformat(),
            'time': a.time.isoformat(),
            'doctor_id': a.doctor_id,
            'status': a.status
        }
        for a in appointments
    ])

@appointment_bp.route('/', methods=['POST'])
def add_appointment():
    data = request.get_json()
    new_appointment = Appointment(
        patient_name=data['patient_name'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        time=datetime.strptime(data['time'], '%H:%M').time(),
        doctor_id=data['doctor_id'],
        status='Scheduled'  # default status
    )
    db.session.add(new_appointment)
    db.session.commit()
    return jsonify({'message': 'Appointment booked successfully'}), 201

@appointment_bp.route('/<int:id>', methods=['PUT'])
def update_appointment(id):
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

@appointment_bp.route('/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({'message': 'Appointment deleted successfully'})
