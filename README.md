# Airline Ticketing System

A full-stack airline ticket booking demo built with React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB and Mongoose.

## Features

- Customer registration and login with hashed passwords and JWT authentication
- Flight search by departure city, destination and date
- Flight results with fare and available-seat information
- Passenger details and reservation creation
- Seat availability updates when reservations are created or cancelled
- Reservation history, details and cancellation
- Admin-only flight listing, flight creation and flight cancellation
- Admin-only user listing API
- Sample flight seeding for demonstration

> This is an academic/demo application. It does not process real payments or issue real airline tickets. Sample flight schedules and fares are for testing only.

## Technology

- Frontend: React, TypeScript, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB with Mongoose
- Authentication: JWT and bcryptjs

## Requirements

- Node.js 20.19+ (Node 22 LTS recommended)
- npm
- MongoDB Community Server running locally, or a MongoDB connection string

## Setup

### 1. Configure the backend

Open a terminal in the project root:

```bash
cd backend
npm install
```

Copy the environment template:

**PowerShell**
```powershell
Copy-Item .env.example .env
```

**Git Bash**
```bash
cp .env.example .env
```

Edit `backend/.env` and set a long random `JWT_SECRET`. Keep `.env` private and never commit it.

### 2. Start MongoDB

Make sure your local MongoDB service is running. The default connection is:

```text
mongodb://127.0.0.1:27017/airline_ticketing
```

Change `MONGODB_URI` if your database uses a different address.

### 3. Seed sample flights

From the `backend` folder:

```bash
npm run seed:flights
```

The script adds demonstration flights for dates relative to the day it runs. It does not delete existing flights.

### 4. Start the backend

In the `backend` folder:

```bash
npm run dev
```

API base URL: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

### 5. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Create an administrator

1. Start the application and register a normal account through the website.
2. In `backend/.env`, set `ADMIN_EMAIL` to that account's email.
3. From the `backend` folder, run:

```bash
npm run make:admin
```

4. Log out and log in again so the new admin role is included in the JWT.
5. Open `/admin` to manage flights.

Public registration always creates a normal user. Never add a role field to the public registration form.

## API overview

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | Public | API health check |
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/auth/me` | JWT | Validate current token |
| GET | `/api/flights/search?from=&to=&date=` | Public | Search scheduled flights |
| POST | `/api/reservations` | JWT | Create reservation |
| GET | `/api/reservations/my` | JWT | List own reservations |
| GET | `/api/reservations/:id` | JWT | View own reservation |
| PATCH | `/api/reservations/:id/cancel` | JWT | Cancel own reservation |
| GET | `/api/admin/flights` | Admin JWT | List all flights |
| POST | `/api/admin/flights` | Admin JWT | Add flight |
| PATCH | `/api/admin/flights/:id` | Admin JWT | Update flight details |
| PATCH | `/api/admin/flights/:id/cancel` | Admin JWT | Cancel flight |
| GET | `/api/admin/users` | Admin JWT | List users (passwords excluded) |

Send protected requests with:

```text
Authorization: Bearer <JWT>
```

## Build checks

Run from each folder:

```bash
# backend
npm run build

# frontend
npm run build
```

## GitHub safety checklist

- Commit `.env.example`, not `.env`.
- Do not commit `node_modules`, `dist`, or personal credentials.
- Never publish JWT tokens, database passwords or payment secrets.
- Use fictional/sample data in screenshots and demonstrations.

## Known demo limitations

- No real airline inventory or airline-provider integration.
- No payment gateway; the displayed fare is a demo amount, not a payment receipt.
- Booking currently stores one lead passenger's contact/identity details and a passenger count; it is not a separate passenger manifest for every traveler.
- Admin UI currently supports adding and cancelling flights; the API supports editing flight details, but an edit form is not included in this demo UI.
- Production deployment would require stronger validation, rate limiting, secure cookie/token strategy, audit logs, transaction strategy and deployment configuration.
