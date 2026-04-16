# SBK Heights Luxury Residences

A premium, full-scale monolithic web application designed and built for the **SBK Heights** real estate development. The project includes a public-facing website highlighting architectural luxury and a fully integrated, secure Admin CMS for lead management and content governance.

## Key Features

### 🏛️ The Public Frontend
- **Emerald Horizon Aesthetics**: A signature visual identity combining a rich, vivid emerald palette (`#114c2e`) with premium gold-gradient accents to exude luxury and sophistication.
- **Classic Luxury Typography**: Features **Playfair Display** for elegant headlines and **Outfit** for clean, highly legible body text, meticulously optimized via `next/font`.
- **Dynamic Content Architecture**: Interactive floor plans, mission & vision pages, scroll-driven interactive galleries with live YouTube integration, and dynamic property showcases—all rendered seamlessly from the backend.
- **Frictionless Lead Capture**: Global "Enquire Now" CTAs are directly interconnected with the backend CRM system.

### 💼 Integrated CMS & Admin Console
- **End-to-End Content Governance**: Fully secured with NextAuth. Features modular CRUD capabilities for Home Banners, About Us Portfolios, Teams, Gallery Media, and strictly governed Legal Pages (TOS & Privacy Policy).
- **Live Console Dashboard**: A real-time data overview presenting absolute lifetime lead counts, recent 7-day conversions, and live incoming leads fetched instantly and robustly from the database.
- **Lead Pipeline CRM**: A dedicated Enquiry management interface for viewing, safely deleting, and tracking potential investor leads.

## Technology Stack
- **Framework**: Next.js 15 (App Router, React Server Components, Server Actions)
- **Styling**: Tailwind CSS v4, Framer Motion (Scroll Animations & Micro-interactions)
- **Database**: MongoDB (Mongoose Schema Models for `User`, `Content`, and `Enquiry`)
- **Authentication**: NextAuth.js (BCrypt encryption, Secure Token Password Resets)
- **Mailing Integration**: Resend API (Transactional dispatch)

## Getting Started

First, ensure you have your `.env.local` configured with the necessary environmental variables:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secure_secret
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
```

Then, execute the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to launch the platform. The Admin Dashboard is securely accessible at `/admin`.

---
*Developed for Shree BK Infratech & Sanjay Garg.*
