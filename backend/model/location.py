from app import db

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), unique=True, nullable=False)
    shelf_number = db.Column(db.String(10), nullable=False)
    row_number = db.Column(db.String(10), nullable=False)
    position = db.Column(db.String(10), nullable=False)
    qr_code = db.Column(db.String(200))  # URL or path to QR code image
    last_updated = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    def __init__(self, book_id, shelf_number, row_number, position, qr_code=None):
        self.book_id = book_id
        self.shelf_number = shelf_number
        self.row_number = row_number
        self.position = position
        self.qr_code = qr_code
    
    def to_dict(self):
        return {
            'id': self.id,
            'book_id': self.book_id,
            'shelf_number': self.shelf_number,
            'row_number': self.row_number,
            'position': self.position,
            'qr_code': self.qr_code,
            'last_updated': self.last_updated.isoformat()
        }
    
    def get_full_location(self):
        return f"Shelf {self.shelf_number}, Row {self.row_number}, Position {self.position}"
    
    def generate_qr_code(self):
        # This method would generate a QR code for the book's location
        # Implementation would depend on the QR code generation library used
        pass 