# MMAFit — 360 Platform

Full-stack web application for [mmafit.se](https://www.mmafit.se/) — the Swedish dance/boxing/MMA hybrid fitness brand founded by Bertrand Amoussou and Kayo Shekoni.

## Stack

| Layer     | Tech |
|-----------|------|
| Frontend  | React 19 + TypeScript + Vite + TailwindCSS + Zustand |
| Backend   | Node.js + Express + TypeScript + Prisma |
| Database  | PostgreSQL |
| Auth      | JWT (30-day tokens) |

## Quick Start

### 1. Database
```bash
docker-compose up -d       # starts PostgreSQL on port 5433
```

### 2. Backend
```bash
cd backend
cp .env.example .env       # fill in DATABASE_URL and JWT_SECRET
npm install
npx prisma db push         # create tables
npm run dev                # http://localhost:3002
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev                # http://localhost:5174
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, programs, benefits, founders, testimonials, pricing, CTAs |
| `/programs` | All 6 programs (Original, Battle, Power, Groove, Hit, Kids) |
| `/schedule` | Weekly class timetable with booking |
| `/trainers` | Bertrand, Kayo + senior instructors |
| `/membership` | 3-tier pricing + comparison table |
| `/shop` | Apparel, equipment, accessories, nutrition |
| `/about` | Brand story and founder bios |
| `/contact` | Contact form + info |
| `/certification` | Instructor certification (380 EUR) |
| `/franchise` | Gym licensing (150 EUR/category/month) |
| `/login` | Sign in |
| `/register` | Create account |
| `/dashboard` | Member or Admin dashboard |

## Admin Dashboard

Sign in with **Demo Admin Login** on the login page to access:

- **Overview** — KPIs, revenue charts, member stats
- **Members** — full member list, add/edit/remove
- **Classes** — program and session management
- **Staff** — team management, contracts, salaries
- **Marketing** — email campaigns, promo codes, social, referrals
- **Events** — create and manage events
- **Bookkeeping** — full transaction ledger
- **Revenue** — financial analytics
- **Tax Reports** — VAT summaries, Swedish tax guidance, CSV export
- **Permissions** — role management
- **Settings** — system configuration

## API Routes

```
POST  /api/auth/register
POST  /api/auth/login
GET   /api/auth/me

GET   /api/classes/programs
GET   /api/classes/sessions
POST  /api/classes/sessions     (admin)

GET   /api/bookings             (auth)
POST  /api/bookings             (auth)
PATCH /api/bookings/:id/cancel  (auth)

GET   /api/members              (admin)
GET   /api/members/stats        (admin)

GET   /api/shop/products
POST  /api/shop/orders          (auth)
GET   /api/shop/orders          (auth)

GET   /api/admin/stats          (admin)
GET   /api/admin/transactions   (admin)
POST  /api/admin/transactions   (admin)
GET   /api/admin/events         (admin)
POST  /api/admin/events         (admin)
GET   /api/admin/promos         (admin)
POST  /api/admin/promos         (admin)
GET   /api/admin/campaigns      (admin)
POST  /api/admin/campaigns      (admin)
GET   /api/admin/certifications (admin)
GET   /api/admin/franchises     (admin)
GET   /api/admin/tax-report     (admin) → CSV
```

## Contact

MMAFit Intl. · 10 Avenue Hoche, 75008 Paris · info@mmafit.se  
Instagram: [@mmafit.academy](https://www.instagram.com/mmafit.academy/)
