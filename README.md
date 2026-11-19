# ♻️ ReCoin

**Turn recyclable waste into value.** ReCoin is a web platform where citizens declare the recyclable waste they bring to drop-off points and earn coins for it. Admins verify accounts and declarations, and an interactive map shows where to drop off each material.

![Django](https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL%20%2B%20PostGIS-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)
![Status](https://img.shields.io/badge/status-Sprint%201-blue?style=flat-square)

---

## Features (Sprint 1)

- **Accounts and roles**: citizen, business, collector, factory and admin. New accounts wait for admin approval.
- **Waste declarations**: a citizen declares a material and a quantity, with an optional photo. Each material has its own coin rate (per kg, litre or unit).
- **Verification workflow**: every declaration is *pending* until an admin marks it *verified* or *rejected*.
- **Drop-off map**: drop-off points are stored as PostGIS coordinates and shown on a Leaflet map with the materials each one accepts.
- **Admin panel**: approve pending accounts and manage materials, declarations and locations.

## Screenshots

> _Add 2–3 screenshots here (login, declare waste, map). Put them in a `docs/` folder and link them like this:_
> `![Map](docs/map.png)`

## Architecture

```
React (frontend/)  ──Axios + JWT──►  Django REST API (backend/)  ──►  PostgreSQL + PostGIS
  pages: auth, citizen, admin                 apps: users, waste, locations
```

| Layer | Tech |
|---|---|
| Frontend | React 19, React Router, Axios, React-Leaflet |
| Backend | Django, Django REST Framework, SimpleJWT, GeoDjango, drf-spectacular (API docs) |
| Database | PostgreSQL 14 + PostGIS 3.2 |

## Quick start

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # fill in SECRET_KEY and DB settings
python manage.py migrate
python manage.py runserver

# Frontend (new terminal)
cd frontend
npm install
npm start
```

Full setup guide (database, PostGIS, admin account, API endpoints): see **[SETUP.md](SETUP.md)**.

## Roadmap

- [ ] Coin wallet and rewards catalogue
- [ ] Collector pickup requests
- [ ] Statistics dashboard for admins
- [ ] Deployment

## Author

**Malak Abdelkhalek** — [GitHub](https://github.com/malakabdelkhalek) · [LinkedIn]https://www.linkedin.com/in/malak-abdelkhalek-5474b12a6/
