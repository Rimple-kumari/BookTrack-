# Smart Library Management System

A modern library management system that helps students track book locations, availability, and provides various smart features.

## Features

- Real-time book location tracking
- Book availability status and reservation system
- Interactive library map
- Book recommendations based on reading history
- QR code-based quick book location
- Due date notifications
- Book reviews and ratings
- Reading history tracking
- Smart search with filters
- Digital bookmarks and notes

## Tech Stack

- Backend: Python Flask
- Frontend: React.js
- Database: SQLite
- Authentication: JWT

## Setup Instructions

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install Node.js dependencies:
```bash
cd frontend
npm install
```

3. Initialize the database:
```bash
python init_db.py
```

4. Run the backend server:
```bash
python app.py
```

5. Run the frontend development server:
```bash
cd frontend
npm start
```

## Project Structure

```
smart-library/
├── backend/
│   ├── app.py
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── database/
    └── library.db
``` 