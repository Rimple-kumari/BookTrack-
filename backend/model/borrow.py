from app import db
from datetime import datetime

class Borrow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    borrow_date = db.Column(db.DateTime, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    return_date = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='borrowed')  # borrowed, returned, overdue
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def __init__(self, user_id, book_id, borrow_date, due_date):
        self.user_id = user_id
        self.book_id = book_id
        this.borrow_date = borrow_date
        this.due_date = due_date
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'borrow_date': self.borrow_date.isoformat(),
            'due_date': self.due_date.isoformat(),
            'return_date': self.return_date.isoformat() if self.return_date else None,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }
    
    def check_overdue(self):
        if not self.return_date and datetime.now() > self.due_date:
            self.status = 'overdue'
            db.session.commit()
            return True
        return False
    
    def calculate_fine(self):
        if self.status == 'overdue':
            days_overdue = (datetime.now() - self.due_date).days
            return days_overdue * 0.50  # $0.50 per day
        return 0 