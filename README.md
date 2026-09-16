# RENTORA — Modern Car Rental Management System

Rentora is a production-ready, full-stack digital car rental platform built with a high-end automotive design system, complete customer rental workflows, real-time price calculations, and an administrative fleet & booking management dashboard.

---

## 🌟 Key Features

### 1. Customer Experience
- **Quick Search Widget**: Real-time pick-up location, dates, and category selection with input validation.
- **Dynamic Fleet Catalog**: Multi-criteria filters by category (SUV, Sedan, Luxury, Electric, Sports, Economy), price slider up to ₹30,000/day, fuel types, transmission, seating capacity, and live availability.
- **Detailed Vehicle Profiles**: Multi-angle image gallery, performance specifications (horsepower, 0-100 km/h, top speed, mileage), feature checklist, and rental policies.
- **5-Step Booking Workflow**:
  1. Vehicle Selection
  2. Pick-up / Drop-off Hubs & Schedule (with date validation)
  3. Customer & Driving License Information
  4. Itemized Price Breakdown (Daily rate × Days + Insurance + GST 18% - Promo code)
  5. Instant Booking Confirmation Voucher with printable receipt
- **My Bookings Portal**: Track active, confirmed, completed, and cancelled reservations with cancellation capability.
- **Theme Modes**: One-click toggle between Dark Mode and Light Mode with persistence in `localStorage`.

### 2. Admin Dashboard & Operations
- **KPI Metrics**: Total Fleet, Available Cars, Total Bookings, Active On-Road Rentals, Gross Revenue (₹), and Pending Requests.
- **Interactive Visualizations**: HTML5 Canvas Monthly Revenue Trend Bar Chart and Fleet Category Split Donut Chart.
- **Fleet Management (CRUD)**: Add new cars, edit specifications/pricing, delete cars, and toggle instant availability.
- **Booking Management**: Filter by status, search by customer/ID, update reservation statuses (Confirmed, Pending, Completed, Cancelled), and view official vouchers.
- **Customer Directory**: View customer profiles, rental counts, lifetime spend, and active reservation status.

---

## 🚀 How to Run the Application

### Option A: Standalone Instant Run (Zero Setup Required)
You can directly open `index.html` in any web browser (Chrome, Edge, Firefox, Safari) or use VS Code Live Server:
- Simply double-click `index.html` or open it with your browser.
- Rentora's built-in **Dual-Engine Architecture** will automatically activate high-performance browser storage (`localStorage`) with pre-seeded fleet, bookings, and demo accounts.

### Option B: Full-Stack Mode with Node.js Express Server
If you want to run the REST API server:
```bash
cd server
npm install
npm start
```
- Server starts at `http://localhost:5000`
- API Health Check: `http://localhost:5000/api/health`
- Fleet API: `http://localhost:5000/api/cars`
- Bookings API: `http://localhost:5000/api/bookings`
- The frontend will automatically detect the server and seamlessly switch to making live REST API calls!

---

## 🔑 Demo Login Credentials

For testing authentication, one-click demo autofill buttons are provided in the Login modal:

| Role | Email | Password |
|---|---|---|
| **Customer Demo** | `customer@rentora.com` | `rentora123` |
| **Admin Demo** | `admin@rentora.com` | `admin123` |

---

## 📁 Architecture & File Structure

```
RENTORA/
├── index.html              # Single-page application hub with all semantic views & modals
├── css/
│   └── styles.css          # Automotive design system, glassmorphism, responsive breakpoints, print receipt
├── js/
│   ├── database.js         # Pre-seeded fleet (18 realistic cars), bookings, testimonials, LocalDB
│   ├── api.js              # Unified REST API client (Express REST / LocalDB auto-detection)
│   ├── app.js              # Application controller, hash router, search & filters, 5-step booking wizard
│   └── admin.js            # Admin dashboard, KPI computations, canvas charts, fleet CRUD
└── server/
    ├── package.json        # Express, CORS dependencies
    ├── server.js           # REST API entry point & static frontend server (Port 5000)
    ├── database.js         # Persistent database read/write helpers
    ├── db.json             # Backend JSON database
    └── routes/
        ├── cars.js         # Full CRUD REST routes for /api/cars
        ├── bookings.js     # Booking creation & status update routes for /api/bookings
        ├── auth.js         # Authentication endpoints for /api/auth
        └── admin.js        # Analytics aggregations for /api/admin
```
