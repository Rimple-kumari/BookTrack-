from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from datetime import datetime, timedelta
import os

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../database/library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Import models
from models.user import User
from models.book import Book
from models.borrow import Borrow
from models.location import Location

# Create database tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
        
    user = User(
        name=data['name'],
        email=data['email'],
        password=data['password']
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token}), 200
        
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books]), 200

@app.route('/api/books/<int:book_id>/location', methods=['GET'])
def get_book_location(book_id):
    book = Book.query.get_or_404(book_id)
    location = Location.query.filter_by(book_id=book_id).first()
    
    if not location:
        return jsonify({'error': 'Location not found'}), 404
        
    return jsonify(location.to_dict()), 200

@app.route('/api/books/<int:book_id>/borrow', methods=['POST'])
@jwt_required()
def borrow_book(book_id):
    user_id = get_jwt_identity()
    book = Book.query.get_or_404(book_id)
    
    if not book.is_available:
        return jsonify({'error': 'Book is not available'}), 400
        
    borrow = Borrow(
        user_id=user_id,
        book_id=book_id,
        borrow_date=datetime.now(),
        due_date=datetime.now() + timedelta(days=14)
    )
    
    book.is_available = False
    db.session.add(borrow)
    db.session.commit()
    
    return jsonify({'message': 'Book borrowed successfully'}), 200

@app.route('/api/books/<int:book_id>/return', methods=['POST'])
@jwt_required()
def return_book(book_id):
    user_id = get_jwt_identity()
    borrow = Borrow.query.filter_by(
        user_id=user_id,
        book_id=book_id,
        return_date=None
    ).first_or_404()
    
    borrow.return_date = datetime.now()
    book = Book.query.get(book_id)
    book.is_available = True
    
    db.session.commit()
    return jsonify({'message': 'Book returned successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True) 