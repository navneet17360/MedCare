from app import db
from flask import Blueprint, jsonify, request
from models.contact import Contact

contact_bp = Blueprint('contact_bp', __name__)

@contact_bp.route('/', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    return jsonify([
        {
            'id': c.id,
            'name': c.name,
            'email': c.email,
            'phone': c.phone,
            'description': c.description
        } for c in contacts
    ])

@contact_bp.route('/', methods=['POST'])
def add_contact():
    data = request.get_json()
    new_contact = Contact(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        description=data['description']
    )
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({'message': 'Contact form submitted successfully'}), 201
