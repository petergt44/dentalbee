# DentalBee Note-Taking Application

A full-stack note-taking application with audio recording capabilities, built with Django REST Framework backend and React frontend.

## Overview

DentalBee is a modern note-taking application that allows users to:
- Create, read, update, and delete notes
- Record and attach audio notes
- User authentication and authorization
- RESTful API architecture

## Tech Stack

### Backend
- **Django 5.1.4** - Web framework
- **Django REST Framework** - API development
- **djangorestframework-simplejwt** - JWT authentication
- **drf-yasg** - API documentation (Swagger/OpenAPI)
- **PostgreSQL** - Database (via psycopg2)

### Frontend
- **React** - UI library
- **React Mic** - Audio recording component

## Project Structure

```
dentalbee/
├── note_app/
│   ├── backend/              # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── notes/                # Notes Django app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── admin.py
│   ├── frontend/             # React application
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   └── Notes.js
│   │   │   ├── components/
│   │   │   │   └── AudioRecorder.js
│   │   │   └── AuthContext.js
│   │   └── package.json
│   ├── tests/                # Test suite
│   │   └── test_notes.py
│   └── manage.py
└── env/                      # Virtual environment
```

## Features

- ✅ User registration and authentication
- ✅ JWT-based authentication
- ✅ Create, read, update, delete notes
- ✅ Audio recording and playback
- ✅ RESTful API with Swagger documentation
- ✅ Responsive React frontend
- ✅ Django admin interface

## Installation

### Prerequisites
- Python 3.10+
- Node.js 14+
- PostgreSQL (optional, can use SQLite for development)

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/petergt44/dentalbee.git
cd dentalbee/note_app
```

2. Create and activate virtual environment:
```bash
python -m venv ../env
source ../env/bin/activate  # On Windows: ..\env\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:

Create a `.env` file in the `note_app` directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=note_app
DB_USER=dentalbee
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432
```

For production, set `DEBUG=False` and use a strong `SECRET_KEY`.

5. (Optional) Configure database settings in `backend/settings.py` if not using environment variables

6. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

7. Create superuser:
```bash
python manage.py createsuperuser
```

8. Run development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Documentation

Once the backend server is running, access the interactive API documentation at:
- **Swagger UI**: `http://localhost:8000/swagger/`
- **ReDoc**: `http://localhost:8000/redoc/`

### API Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login (returns JWT tokens)
- `GET /api/notes/` - List all notes (authenticated)
- `POST /api/notes/` - Create a new note
- `GET /api/notes/{id}/` - Retrieve a specific note
- `PUT /api/notes/{id}/` - Update a note
- `DELETE /api/notes/{id}/` - Delete a note

## Usage

1. **Register/Login**: Create an account or login to get JWT tokens
2. **Create Notes**: Add new notes with text and optional audio
3. **Record Audio**: Use the audio recorder component to attach audio notes
4. **Manage Notes**: Edit or delete your notes through the UI

## Testing

Run backend tests:
```bash
python manage.py test
```

Run frontend tests:
```bash
cd frontend
npm test
```

## Development

### Backend Development
- Django admin available at `/admin/`
- API endpoints follow RESTful conventions
- JWT tokens for authentication

### Frontend Development
- React components in `src/components/`
- Pages in `src/pages/`
- Context API for authentication state

## Environment Variables

The application uses `python-decouple` to manage environment variables. See the setup instructions above for required variables.

**Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or issues, please open an issue on GitHub.

