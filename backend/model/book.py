from app import db
from datetime import datetime

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    isbn = db.Column(db.String(13), unique=True, nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    # Relationships
    location = db.relationship('Location', backref='book', uselist=False)
    borrows = db.relationship('Borrow', backref='book', lazy=True)
    
    def __init__(self, title, author, isbn, description=None, category=None):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.description = description
        self.category = category
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'isbn': self.isbn,
            'description': self.description,
            'category': self.category,
            'is_available': self.is_available,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'location': self.location.to_dict() if self.location else None
        }
    
    def get_availability_status(self):
        if self.is_available:
            return "Available"
        else:
            current_borrow = next((b for b in self.borrows if b.return_date is None), None)
            if current_borrow:
                return f"Borrowed until {current_borrow.due_date.strftime('%Y-%m-%d')}"
            return "Unavailable" 