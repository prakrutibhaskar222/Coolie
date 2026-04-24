# Coolie – Field Service Booking and Worker Management Platform

A comprehensive full-stack on-demand workforce and service booking platform that connects customers, service providers (workers), and administrators through a seamless digital experience.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Database Collections](#database-collections)
- [Security](#security)
- [Future Enhancements](#future-enhancements)
- [Team](#team)

---

## Overview

Coolie acts as a digital bridge between demand and supply of skilled labor, providing transparency, efficiency, and reliability to all stakeholders involved. The platform supports:

- **Customers** — browse services, select time slots, place bookings, and track status
- **Workers** — manage assignments, schedules, availability, and performance via a dedicated dashboard
- **Administrators** — centralized control over services, workers, bookings, and operational analytics

The system follows a modular, role-based architecture ensuring scalability, maintainability, and security.

---

## Features

### Customer Features
- Browse and search services by category
- View detailed service pages with pricing, duration, and reviews
- Calendar-based date and time slot selection for booking
- Save services to a Favorites list
- Real-time booking confirmation with email notification
- User dashboard with booking history and profile management
- Notification panel for booking updates

### Worker Features
- Dedicated worker dashboard with daily job list
- Availability management (working hours + blocked time slots)
- Job status updates (accept, in-progress, completed)
- Earnings and performance history
- Real-time notifications for new assignments and schedule changes

### Admin Features
- Centralized admin dashboard with platform analytics
- Manage all bookings (view, update status, assign workers)
- Register and verify workers
- Service catalog management (create, update, delete)
- Payment tracking and invoice generation
- Export booking data as CSV

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Framer Motion, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| Icons | Lucide React |
| HTTP Client | Axios |
| Version Control | Git & GitHub |

### Hardware Requirements (Development)
- Processor: Intel Core i3 or higher
- RAM: 8 GB minimum
- Storage: 500 GB (SSD recommended)
- Internet: 2 Mbps minimum broadband

---

## Project Structure

```
coolie/
├── backend/
│   ├── routes/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── emails/
│   │   ├── jobs/
│   │   ├── middleware/
│   │   ├── models/
│   │   │   ├── Attendance.js
│   │   │   ├── Booking.js
│   │   │   ├── Category.js
│   │   │   ├── Invoice.js
│   │   │   ├── Notification.js
│   │   │   ├── Review.js
│   │   │   ├── Service.js
│   │   │   ├── Slot.js
│   │   │   ├── User.js
│   │   │   └── Worker.js
│   │   └── utils/
│   ├── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── context/
    │   └── utils/
    └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/coolie.git
   cd coolie
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

5. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the frontend**
   ```bash
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

---

## API Documentation

The backend exposes RESTful APIs running on `http://localhost:5001`.

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password with token |

### Services
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services` | Get all services |
| GET | `/api/services/:id` | Get service by ID |
| POST | `/api/services` | Create a service (Admin) |
| PUT | `/api/services/:id` | Update a service (Admin) |
| DELETE | `/api/services/:id` | Delete a service (Admin) |

### Bookings
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/bookings` | Create a booking |
| GET | `/api/bookings` | Get all bookings (Admin) |
| GET | `/api/bookings/my` | Get current user's bookings |
| PUT | `/api/bookings/:id/status` | Update booking status (Admin) |
| PUT | `/api/bookings/:id/assign` | Assign worker to booking (Admin) |

### Workers
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/register-worker` | Register a new worker (Admin) |
| GET | `/api/workers` | Get all workers (Admin) |
| PUT | `/api/workers/:id/verify` | Verify worker account (Admin) |
| GET | `/api/workers/dashboard` | Worker's dashboard data |
| PUT | `/api/workers/availability` | Update worker availability |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/profile` | Get current user profile |
| PUT | `/api/users/profile` | Update profile |
| POST | `/api/users/favorites/:serviceId` | Toggle service favorite |
| GET | `/api/users/history` | Get service history |

### Notifications
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notifications` | Get all notifications |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |

---

## User Roles

### Role: `user` (Customer)
- Browse and book services
- Manage profile, favorites, and booking history
- Receive notifications about booking status

### Role: `worker` (Service Provider)
- View and manage assigned jobs
- Update availability and job status
- Access earnings and performance data

### Role: `admin` (Administrator)
- Full platform access
- Register and verify workers
- Manage all services and bookings
- Access platform analytics

---

## Database Collections

| Collection | Description |
|---|---|
| `users` | Customer and admin accounts |
| `workers` | Worker profiles and credentials |
| `services` | Service catalog with categories and pricing |
| `bookings` | Booking records linking users, services, and workers |
| `categories` | Service category definitions |
| `reviews` | Customer reviews for services |
| `notifications` | System alerts for all user roles |
| `invoices` | Payment and billing records |
| `slots` | Time slot availability data |
| `attendance` | Worker attendance tracking |

---

## Security

- **Password Hashing** — Passwords are securely hashed using bcrypt before storage
- **JWT Authentication** — Stateless token-based session management (30-day expiry)
- **Role-Based Access Control (RBAC)** — Middleware enforces per-role route permissions
- **Input Validation** — All request inputs are validated before processing
- **Rate Limiting** — API rate limiting via Upstash to prevent abuse
- **Centralized Error Handling** — Consistent error responses across all endpoints

---

## Future Enhancements

- Online payment gateway integration (Razorpay / Stripe)
- Real-time notifications using WebSockets
- AI-based service recommendations and smart worker assignment
- Mobile applications for Android and iOS
- Advanced admin analytics and reporting dashboards
- Customer–worker in-app chat
- Multilingual support
- Automated feedback analysis

---

## Team

| Name | USN |
|---|---|
| Prakruti Bhaskar | 1BF24CS222 |
| R Vandanaa | 1BF24CS237 |
| Pranav Raghuraman | 1BF24CS223 |
| Priya K C | 1BF24CS231 |

**Guide:** Anusha S, Assistant Professor, Department of CSE

**Institution:** B.M.S. College of Engineering, Bengaluru — Affiliated to Visvesvaraya Technological University, Belagavi

**Academic Year:** 2025–2026

---

*Full Stack Web Development Project — 23CS3AEFWD*
