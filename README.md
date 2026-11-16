# ReCoin — Sprint 1 — Project Guide

**A web platform that turns recyclable waste into value.**

---

## Project Structure

```
recoin/
├── venv/               # Python virtual environment (don't touch)
├── backend/            # Django backend
│   ├── backend/        # Project config (settings, urls)
│   ├── users/          # Auth, roles, profiles
│   ├── waste/          # Materials and declarations
│   ├── locations/      # Drop-off points (map)
│   ├── manage.py
│   └── .env            # Environment variables (keep private)
└── frontend/           # React frontend
    ├── src/
    │   ├── api/        # Axios instance
    │   ├── components/ # Navbar, PrivateRoute
    │   ├── context/    # AuthContext (login state)
    │   └── pages/
    │       ├── auth/   # Login, Register
    │       ├── citizen/# Profile, DeclareWaste, Map
    │       └── admin/  # PendingAccounts
    └── package.json
```

---

## Prerequisites

Make sure these are installed on your machine:

| Tool | Version used | Check command |
|---|---|---|
| Python | 3.10.12 | `python3 --version` |
| Node | 18.x | `node --version` |
| PostgreSQL | 14 | `psql --version` |
| PostGIS | 3.2 | installed via `apt` |

---

## First-Time Setup (already done — skip if re-cloning)

### 1. Database

```bash
sudo -u postgres psql
```

```sql
CREATE USER recoin_user WITH PASSWORD 'recoin_pass';
CREATE DATABASE recoin_db OWNER recoin_user;
\c recoin_db
CREATE EXTENSION postgis;
GRANT ALL PRIVILEGES ON DATABASE recoin_db TO recoin_user;
\q
```

### 2. Backend dependencies

```bash
cd ~/recoin
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary django-environ Pillow
```

### 3. Run migrations

```bash
cd ~/recoin/backend
source ~/recoin/venv/bin/activate
python manage.py migrate
```

### 4. Create admin account

```bash
python manage.py createsuperuser
```

### 5. Frontend dependencies

```bash
cd ~/recoin/frontend
npm install
```

---

## How to Launch (every time)

You need **two terminals** running at the same time.

### Terminal 1 — Django backend

```bash
cd ~/recoin/backend
source ~/recoin/venv/bin/activate
python manage.py runserver 8001
```

Backend runs at: http://127.0.0.1:8001

### Terminal 2 — React frontend

```bash
cd ~/recoin/frontend
npm start
```

Frontend runs at: http://localhost:3001 (or 3000 if nothing else is running)

---

## Django Admin Panel

URL: http://127.0.0.1:8001/admin/  
Login: your superuser credentials (username: `malak`)

If you forgot your password:
```bash
cd ~/recoin/backend
source ~/recoin/venv/bin/activate
python manage.py changepassword malak
```

### What to manage in the admin:

**Materials** (Waste → Materials)
Add recyclable material types with their coin rates.

| Name | Unit | Coins per unit |
|---|---|---|
| Plastic Bottle | unit | 5 |
| Used Oil | litre | 10 |
| Aluminum Can | unit | 3 |
| Cardboard | kg | 2 |

**Drop-off Points** (Locations → Drop off points)
Add a point with a name, address, and location.
For the location field, use the map widget or type: `POINT(longitude latitude)`
Example for central Tunis: `POINT(10.1815 36.8065)`

**Users** (Users → Users)
Approve business/collector/factory accounts that are waiting for verification.

---

## API Endpoints

Base URL: `http://127.0.0.1:8001/api`

All protected endpoints require the header:
```
Authorization: Bearer <access_token>
```

### Auth

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/users/register/` | Create account | No |
| POST | `/users/login/` | Get JWT tokens | No |
| POST | `/users/token/refresh/` | Refresh access token | No |
| GET/PATCH | `/users/profile/` | View or edit profile | Yes |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/admin/pending/` | List accounts awaiting approval |
| POST | `/users/admin/approve/<id>/` | Approve an account |

### Waste

| Method | Endpoint | Description |
|---|---|---|
| GET | `/waste/materials/` | List all materials and coin rates |
| GET | `/waste/declarations/` | My declarations |
| POST | `/waste/declarations/` | Submit a new declaration |

### Locations

| Method | Endpoint | Description |
|---|---|---|
| GET | `/locations/dropoff-points/` | All active drop-off points |

---

## User Roles

| Role | Auto-approved | What they can do |
|---|---|---|
| Citizen | Yes | Declare waste, view map, earn Coins |
| Business | No (needs admin) | Schedule pickups, earn Eco Points |
| Collector | No (needs admin) | Accept pickup requests, validate collections |
| Factory | No (needs admin) | Buy material lots |
| Admin | Yes (superuser) | Manage everything |

---

## Quick API Test (curl)

Register:
```bash
curl -s -X POST http://127.0.0.1:8001/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "email": "test@test.com", "password": "test1234!", "role": "citizen"}' \
  | python3 -m json.tool
```

Login:
```bash
curl -s -X POST http://127.0.0.1:8001/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "test1234!"}' \
  | python3 -m json.tool
```

---

## Sprint 1 — What Was Built

- Custom user model with 5 roles
- JWT authentication (register, login, token refresh)
- Profile view and edit
- Admin account approval flow
- Waste declaration form with photo upload
- Materials catalog with coin rates
- Drop-off points with PostGIS geolocation
- React frontend: Login, Register, Profile, Declare Waste, Map, Admin panel
- Protected routes based on login and role

## Sprint 2 — Next Steps

- Pickup requests
- QR code validation by collector
- Automatic Coin crediting after verified collection
- Offers and coupons (business → citizen)
- Notifications
