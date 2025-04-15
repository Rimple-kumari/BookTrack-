from backend.app import db, app
from backend.models.user import User
from backend.models.book import Book
from backend.models.location import Location
from datetime import datetime, timedelta

def init_db():
    with app.app_context():
        # Create tables
        db.create_all()
        
        # Add sample users
        users = [
            User('John Doe', 'john@example.com', 'password123'),
            User('Jane Smith', 'jane@example.com', 'password123')
        ]
        for user in users:
            db.session.add(user)
        
        # Add sample books
        books = [
            Book('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 
                 'A story of the fabulously wealthy Jay Gatsby', 'Fiction'),
            Book('To Kill a Mockingbird', 'Harper Lee', '9780446310789',
                 'The story of racial injustice and loss of innocence', 'Fiction'),
            Book('1984', 'George Orwell', '9780451524935',
                 'A dystopian social science fiction novel', 'Science Fiction')
        ]
        for book in books:
            db.session.add(book)
        
        db.session.commit()
        
        # Add sample locations
        locations = [
            Location(1, 'A', '1', '1', 'qr_code_1.png'),
            Location(2, 'A', '1', '2', 'qr_code_2.png'),
            Location(3, 'B', '1', '1', 'qr_code_3.png')
        ]
        for location in locations:
            db.session.add(location)
        
        db.session.commit()
        
        print("Database initialized with sample data!")

if __name__ == '__main__':
    init_db() 