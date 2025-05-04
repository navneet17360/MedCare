from app import db
from flask import Blueprint, jsonify, request
from models.doctor import Doctor

doctor_bp = Blueprint('doctor_bp', __name__)

# Define routes here
@doctor_bp.route('/', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([
        {
            'id': doc.id,
            'name': doc.name,
            'specialty': doc.specialty,
            'years_experience': doc.years_experience,
            'hospital_name': doc.hospital_name,
            'address': doc.address,
            'description': doc.description,
            'contact': doc.contact,
            'charges': doc.charges,
            'availability': doc.availability,
            'image_url':doc.image_url
        }
        for doc in doctors
    ])
@doctor_bp.route('/specialty/<string:specialty>', methods=['GET'])
def get_doctors_by_specialty(specialty):
    doctors = Doctor.query.filter(db.func.lower(Doctor.specialty) == specialty.lower()).all()
    if not doctors:
        return jsonify({'message': 'No doctors found for this specialty'}), 404
    return jsonify([
        {
            'id': doc.id,
            'name': doc.name,
            'specialty': doc.specialty,
            'years_experience': doc.years_experience,
            'hospital_name': doc.hospital_name,
            'address': doc.address,
            'description': doc.description,
            'contact': doc.contact,
            'charges': doc.charges,
            'availability': doc.availability,
            'image_url': doc.image_url
        }
        for doc in doctors
    ])
 

@doctor_bp.route('/', methods=['POST'])
def add_doctor():
    data = request.get_json()
    new_doc = Doctor(
        name=data['name'],
        specialty=data['specialty'],
        years_experience=data.get('years_experience'),
        hospital_name=data.get('hospital_name'),
        address=data.get('address'),
        description=data.get('description'),
        contact=data.get('contact'),
        charges=data.get('charges'),
        availability=data.get('availability'),
        image_url=data.get('image_url')
    )
    db.session.add(new_doc)
    db.session.commit()
    return jsonify({'message': 'Doctor added successfully'}), 201

@doctor_bp.route('/<int:id>', methods=['PUT'])
def update_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    data = request.get_json()

    doctor.name = data.get('name', doctor.name)
    doctor.specialty = data.get('specialty', doctor.specialty)
    doctor.years_experience = data.get('years_experience', doctor.years_experience)
    doctor.hospital_name = data.get('hospital_name', doctor.hospital_name)
    doctor.address = data.get('address', doctor.address)
    doctor.description = data.get('description', doctor.description)
    doctor.contact = data.get('contact', doctor.contact)
    doctor.charges = data.get('charges', doctor.charges)
    doctor.availability = data.get('availability', doctor.availability)
    doctor.image_url=data.get('image_url',doctor.image_url)

    db.session.commit()
    return jsonify({'message': 'Doctor updated successfully'})

@doctor_bp.route('/<int:id>', methods=['DELETE'])
def delete_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    db.session.delete(doctor)
    db.session.commit()
    return jsonify({'message': 'Doctor deleted successfully'})
