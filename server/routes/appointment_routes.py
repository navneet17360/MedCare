from flask import Blueprint, jsonify, request

from app import db
from models.appointment import Appointment

appointment_bp = Blueprint('appointment_bp', __name__)

@appointment_bp.route('/', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    return jsonify([
        {
            'id': a.id,
            'date': a.date.isoformat(),
            'time': a.time.isoformat(),
            'doctor_id': a.doctor_id,
            'patient_id': a.patient_id,
            'status': a.status
        }
        for a in appointments
    ])

@appointment_bp.route('/', methods=['POST'])
def add_appointment():
    data = request.get_json()
    new_appointment = Appointment(
        date=data['date'],
        time=data['time'],
        doctor_id=data['doctor_id'],
        patient_id=data['patient_id'],
        status=data['status']
    )
    db.session.add(new_appointment)
    db.session.commit()
    return jsonify({'message': 'Appointment added successfully'}), 201

@appointment_bp.route('/<int:id>', methods=['PUT'])
def update_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    data = request.get_json()
    appointment.date = data.get('date', appointment.date)
    appointment.time = data.get('time', appointment.time)
    appointment.doctor_id = data.get('doctor_id', appointment.doctor_id)
    appointment.patient_id = data.get('patient_id', appointment.patient_id)
    appointment.status = data.get('status', appointment.status)
    db.session.commit()
    return jsonify({'message': 'Appointment updated successfully'})

@appointment_bp.route('/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({'message': 'Appointment deleted successfully'})
