# SkyRoute - Airline Ticketing System

A full-stack web-based **Airline Ticketing System** that allows users to search for flights, make reservations, and manage their bookings. The system also provides an administrative dashboard for managing flights and users.

The application is developed using React and TypeScript for the frontend, Node.js and Express for the backend, and MongoDB for database management.

## Technologies Used

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- bcryptjs for password hashing
- Role-based authorization

## Features

### 👤 User Features

- User registration and login
- Secure authentication using JWT
- Search flights by departure city, destination, and date
- View available flights and ticket fares
- Check available seats
- Enter passenger information
- Book flight reservations
- View reservation history
- View reservation details
- Cancel reservations
- Track reservation status

### Admin Features

- Admin dashboard
- View all flights
- Add new flights
- Update flight details through the API
- Cancel flights
- View registered users
- Role-based admin access control

## 📁 Project Structure

```text
AirlineTicketingSystem/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── adminController.ts
│   │   │   ├── authController.ts
│   │   │   ├── flightController.ts
│   │   │   └── reservationController.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts
│   │   │   └── roleMiddleware.ts
│   │   │
│   │   ├── models/
│   │   │   ├── Flight.ts
│   │   │   ├── Reservation.ts
│   │   │   └── User.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── adminRoutes.ts
│   │   │   ├── authRoutes.ts
│   │   │   ├── flightRoutes.ts
│   │   │   └── reservationRoutes.ts
│   │   │
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── flightService.ts
│   │   │   └── reservationService.ts
│   │   │
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── seedFlights.ts
│   │   └── promoteAdmin.ts
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Navbar.tsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── Booking.tsx
│   │   │   ├── BookingConfirmation.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── FlightResults.tsx
│   │   │   ├── FlightSearch.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── MyReservations.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ReservationDetails.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

## Installation and Setup

Follow these instructions to run the project locally.

### Prerequisites

Install the following:

- Node.js 20.19+ (Node.js 22 LTS recommended)
- npm
- MongoDB Community Server or a MongoDB connection string
- Visual Studio Code (recommended)

### Step 1: Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd AirlineTicketingSystem
```

### Step 2: Set Up the Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file from the provided example.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

Open `backend/.env` and configure the environment variables:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/airline_ticketing
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=admin@example.com
```

**Important:** Use a strong, private JWT secret. Never upload your actual `.env` file to GitHub.

### Step 3: Start MongoDB

Make sure your MongoDB server is running.

The default database connection is:

```text
mongodb://127.0.0.1:27017/airline_ticketing
```

The database will be used by the backend through Mongoose.

### Step 4: Insert Sample Flight Data

From the backend directory, run:

```bash
npm run seed:flights
```

This command inserts demonstration flight schedules for testing.

It does not delete existing flight records.

### Step 5: Start the Backend Server

Run:

```bash
npm run dev
```

The backend API will run at:

```text
http://localhost:5000
```

Health check endpoint:

```text
http://localhost:5000/api/health
```

### Step 6: Set Up the Frontend

Open a second terminal.

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open the Vite URL displayed in your terminal. Normally:

```text
http://localhost:5173
```

You can now access the Airline Ticketing System through your browser.

## Admin Account Setup

To create an administrator account:

1. Start the application.
2. Register a normal user account through the website.
3. Open `backend/.env`.
4. Set `ADMIN_EMAIL` to the registered account's email address.
5. Open a terminal in the backend directory.
6. Run:

```bash
npm run make:admin
```

7. Log out and log in again to receive a JWT containing the updated admin role.
8. Open the `/admin` page to access the administrative dashboard.

**Note:** Public registration creates normal user accounts. Administrator privileges must be assigned through the backend process.

## API Endpoints

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get authenticated user information |

### Flight APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/flights/search?from=&to=&date=` | Search available flights |

### Reservation APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reservations` | Create a reservation |
| GET | `/api/reservations/my` | View personal reservations |
| GET | `/api/reservations/:id` | View reservation details |
| PATCH | `/api/reservations/:id/cancel` | Cancel a reservation |

### Admin APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/flights` | View all flights |
| POST | `/api/admin/flights` | Add a new flight |
| PATCH | `/api/admin/flights/:id` | Update flight details |
| PATCH | `/api/admin/flights/:id/cancel` | Cancel a flight |
| GET | `/api/admin/users` | View registered users |

**Authentication:** Protected API endpoints require a valid JWT token.

Include the token in the request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Build and Testing

To build the backend:

```bash
cd backend
npm run build
```

To build the frontend:

```bash
cd frontend
npm run build
```

These commands check and compile the respective TypeScript applications.

## Security Notes

- Passwords are hashed using bcryptjs.
- JWT is used for authentication.
- Role-based middleware protects administrator endpoints.
- Environment variables are used for sensitive configuration.
- The `.env` file should never be committed to a public repository.
- Use fictional data when demonstrating the application.

## Project Limitations

This is an academic/demo application and has some limitations:

- It does not integrate with real airline inventory providers.
- It does not include a payment gateway.
- Flight schedules and fares are demonstration data.
- Reservations store one lead passenger's details and a passenger count rather than a separate passenger record for every traveler.
- The admin interface supports adding and cancelling flights; although the API supports flight updates, the demo interface does not include an edit form.
- Additional security and deployment work is needed before production use.

## Project Information

**Project Name:** Airline Ticketing System

**Project Type:** Full-Stack Web Application

**Frontend:** React, TypeScript, Tailwind CSS

**Backend:** Node.js, Express.js, TypeScript

**Database:** MongoDB

**Authentication:** JWT and bcryptjs

**Purpose:** Academic / Demonstration Project

## License

No specific open-source license has been defined for this project. Please contact the project owner before reusing or distributing the source code.
