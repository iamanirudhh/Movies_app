# Movie Mania API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## User Endpoints

### Register User
- **POST** `/user/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### Login User
- **POST** `/user/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User Profile
- **GET** `/user/profile`
- **Headers:** `Authorization: Bearer <token>`

### Update User Profile
- **PUT** `/user/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "Updated Name",
  "phone": "+1234567890"
}
```

### Get User Bookings
- **GET** `/user/bookings`
- **Headers:** `Authorization: Bearer <token>`

## Movie Endpoints

### Get All Movies
- **GET** `/movies/`
- **GET** `/movies/getAllMovies`

### Get Movie by ID
- **GET** `/movies/:id`

### Search Movies
- **GET** `/movies/search?query=spider`

### Add Movie (Admin Only)
- **POST** `/movies/`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**
```json
{
  "title": "Movie Title",
  "description": "Movie description",
  "rating": "8.5/10",
  "image": "https://example.com/image.jpg",
  "genre": "Action, Adventure",
  "cast": "Actor 1, Actor 2",
  "director": "Director Name",
  "duration": "2h 1m",
  "language": "English",
  "ticketPrice": 12,
  "showtimes": ["12:00 PM", "3:00 PM", "7:00 PM", "10:00 PM"]
}
```

### Update Movie (Admin Only)
- **PUT** `/movies/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

### Delete Movie (Admin Only)
- **DELETE** `/movies/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

## Booking Endpoints

### Create Booking
- **POST** `/bookings/`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "movieId": "60d21b4667d0d8992e610c85",
  "movieTitle": "Spider-Man",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "userPhone": "+1234567890",
  "showDate": "2025-08-20",
  "showTime": "7:00 PM",
  "numberOfTickets": 2
}
```

### Get Booking by ID
- **GET** `/bookings/:id`
- **Headers:** `Authorization: Bearer <token>`

### Cancel Booking
- **PUT** `/bookings/:id/cancel`
- **Headers:** `Authorization: Bearer <token>`

### Get All Bookings (Admin Only)
- **GET** `/bookings/`
- **Headers:** `Authorization: Bearer <admin-token>`

### Get Booking Statistics (Admin Only)
- **GET** `/bookings/stats/overview`
- **Headers:** `Authorization: Bearer <admin-token>`

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Sample Login Credentials (after running seed script)

### Admin User
- Email: `admin@moviemania.com`
- Password: `admin123`

### Regular User
- Email: `user@moviemania.com`
- Password: `user123`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env` file

3. Seed the database with sample data:
```bash
npm run seed
```

4. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`
