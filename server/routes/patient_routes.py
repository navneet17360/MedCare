from flask import Blueprint, jsonify, request

from app import db
from models.patient import Patient

patient_bp = Blueprint('patient_bp', __name__)

@patient_bp.route('/', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'email': p.email, 'phone': p.phone, 'age': p.age} for p in patients])

@patient_bp.route('/', methods=['POST'])
def add_patient():
    data = request.get_json()
    new_patient = Patient(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        age=data.get('age')
    )
    db.session.add(new_patient)
    db.session.commit()
    return jsonify({'message': 'Patient added successfully'}), 201

@patient_bp.route('/<int:id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get_or_404(id)
    data = request.get_json()
    patient.name = data.get('name', patient.name)
    patient.email = data.get('email', patient.email)
    patient.phone = data.get('phone', patient.phone)
    patient.age = data.get('age', patient.age)
    db.session.commit()
    return jsonify({'message': 'Patient updated successfully'})

@patient_bp.route('/<int:id>', methods=['DELETE'])
def delete_patient(id):
    patient = Patient.query.get_or_404(id)
    db.session.delete(patient)
    db.session.commit()
    return jsonify({'message': 'Patient deleted successfully'})
