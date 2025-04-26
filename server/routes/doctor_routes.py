from flask import Blueprint, jsonify, request

from app import db
from models.doctor import Doctor

doctor_bp = Blueprint('doctor_bp', __name__)

@doctor_bp.route('/', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([{'id': doc.id, 'name': doc.name, 'email': doc.email, 'specialty': doc.specialty, 'phone': doc.phone} for doc in doctors])

@doctor_bp.route('/', methods=['POST'])
def add_doctor():
    data = request.get_json()
    new_doc = Doctor(
        name=data['name'],
        email=data['email'],
        specialty=data.get('specialty'),
        phone=data.get('phone')
    )
    db.session.add(new_doc)
    db.session.commit()
    return jsonify({'message': 'Doctor added successfully'}), 201

@doctor_bp.route('/<int:id>', methods=['PUT'])
def update_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    data = request.get_json()
    doctor.name = data.get('name', doctor.name)
    doctor.email = data.get('email', doctor.email)
    doctor.specialty = data.get('specialty', doctor.specialty)
    doctor.phone = data.get('phone', doctor.phone)
    db.session.commit()
    return jsonify({'message': 'Doctor updated successfully'})

@doctor_bp.route('/<int:id>', methods=['DELETE'])
def delete_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    db.session.delete(doctor)
    db.session.commit()
    return jsonify({'message': 'Doctor deleted successfully'})