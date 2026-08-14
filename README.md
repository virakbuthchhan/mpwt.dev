# MPWT Department of Information Technology Systems (mpwt.dev)

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.13-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

Official government web application for the **Department of Information Technology Systems** (DITS), operating under the **Directorate General of GDPTR**, **Ministry of Public Works and Transport (MPWT)**, Kingdom of Cambodia. Hosted on **mpwt.dev**.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [Nuxt.js 3](https://nuxt.com/) (SSR + SPA Admin) with Vue 3 Composition API (`<script setup>`)
- **Styling & Design**: Tailwind CSS with custom MPWT theme (`#1a2e5a` Dark Navy, `#c9a84c` Gold, `#f5f6fa` Surface)
- **State Management**: [Pinia](https://pinia.vuejs.org/) (`useAuthStore`, `useAccessibilityStore`, `useSiteStore`)
- **Bilingual Localization**: `@nuxtjs/i18n` with Khmer (`km`, default) and English (`en`)
- **SEO & Sitemap**: `@nuxtjs/sitemap` & `useSeoMeta()` with canonical URL `https://mpwt.dev`
- **Backend & Database**: PostgreSQL 16 relational database with [Prisma ORM](https://www.prisma.io/)
- **Caching Layer**: Redis 7 in-memory cache for high-frequency GET endpoints & cache invalidation
- **Containerization**: Multi-stage `Dockerfile` & `docker-compose.yml`

---

## 🌐 Public Features & Client Pages

1. **Home (`/`)**: Hero banner, scrolling urgent Announcement Ticker, quick service links, latest news cards, featured IT project highlights, technology showcase teaser, and statistics counter.
2. **About (`/about`)**: Department mission & vision, organizational chart, leadership team cards, and history milestones timeline.
3. **Services (`/services`)**: Grid of IT services with interactive detail view modal.
4. **Technology Showcase (`/technology`)**: Portfolio of tech systems (Web, Mobile, Infrastructure, Data) with tech stack tags (Laravel, Vue, PostgreSQL, Docker, etc.), live status badges, and category filters.
5. **IT Project Tracker (`/projects`)**: Filterable project tracker by status (Planning, In Progress, Completed) and year, with progress bars.
6. **Staff Directory (`/staff`)**: Searchable staff directory filtered by unit, position, email, and phone contact info.
7. **FAQ (`/faq`)**: Accordion-style categorized FAQ with live search.
8. **Open Data Portal (`/open-data`)**: Public datasets list (CSV, JSON, PDF) with format filters and file download simulation.
9. **News Listing & Detail (`/news` & `/news/[slug]`)**: Paginated news list with search and article detail view featuring social share buttons (**Facebook**, **Telegram**, **Twitter/X**, **Copy Link**).
10. **Global Search (`/search`)**: Multi-category search grouped by News, Projects, Staff, Tech, FAQ, and Open Data.
11. **Contact (`/contact`)**: Address, phone, email, Google Maps embed, and online inquiry form that persists to Admin Inbox.
12. **Floating Accessibility Toolbar (`AccessibilityToolbar.vue`)**: Bottom-right floating widget controlling text font scale (100%, 115%, 130%), high-contrast theme, dyslexia-friendly typography toggle, saved in `localStorage`.

---

## 🔐 Admin Panel & CMS (`/admin/*`)

- **JWT Authentication (`/admin/login`)**: Login portal with demo buttons for role-based access (**Super Admin**, **Content Editor**, **Audit Viewer**).
- **Route Protection (`middleware/auth.ts`)**: Protects all `/admin/*` routes.
- **Dashboard Overview (`/admin`)**: Real-time stats cards, recent system activity log feed, and contact inbox preview.
- **News Manager (`/admin/news`)**: Article CRUD manager with WYSIWYG / HTML Rich Text Editor.
- **IT Projects Manager (`/admin/projects`)**: Manage IT projects, timelines, and progress percentages.
- **Staff Directory Manager (`/admin/staff`)**: Manage officer profiles and office units.
- **FAQ Manager (`/admin/faq`)**: Manage categorized questions and answers.
- **Open Data Manager (`/admin/open-data`)**: Manage public dataset uploads and file formats.
- **Tech Showcase Manager (`/admin/technology`)**: Manage tech stack tags and live status.
- **Site Settings & Ticker (`/admin/settings`)**: Update scrolling announcement banner, contact inbox, and user role permissions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `^18.0.0` or `^22.0.0`
- Docker & Docker Compose (Optional for containerized setup)

### Quick Start (Local Development)

```bash
# 1. Clone repository
git clone git@github.com-virakbuthchhan:virakbuthchhan/mpwt.dev.git
cd mpwt.dev

# 2. Install dependencies
npm install

# 3. Setup Environment variables
cp .env.example .env

# 4. Generate Prisma Client
npx prisma generate

# 5. Start development server
npm run dev
```

Visit:
- **Public Site**: `http://localhost:3000`
- **Admin Portal**: `http://localhost:3000/admin` (Demo Credentials: `admin` / `admin123`)

---

## 🐳 Running with Docker Compose

To launch the full production stack (Nuxt 3 App + PostgreSQL 16 + Redis 7):

```bash
# Build and run containers in background
docker-compose up -d --build

# Run database schema push & initial seed
npx prisma db push
npx prisma db seed
```

---

## 📁 Project Structure

```
├── app.vue
├── nuxt.config.ts
├── tailwind.config.js
├── docker-compose.yml
├── Dockerfile
├── prisma/
│   ├── schema.prisma          ← PostgreSQL Data Models
│   └── seed.ts                ← Database Seeder
├── layouts/
│   ├── default.vue            ← Public Header, Announcement Ticker, Accessibility Toolbar, Footer
│   └── admin.vue              ← Admin Sidebar & Top Bar
├── pages/
│   ├── index.vue              ← Home
│   ├── about.vue              ← About
│   ├── services.vue           ← Services Catalog
│   ├── technology.vue         ← Tech Showcase
│   ├── projects.vue           ← IT Project Tracker
│   ├── staff.vue              ← Staff Directory
│   ├── faq.vue                ← FAQ Accordion
│   ├── open-data.vue          ← Open Data Portal
│   ├── contact.vue            ← Contact & Online Inquiry
│   ├── news/                  ← News & Notices
│   ├── search.vue             ← Global Search
│   └── admin/                 ← Admin CMS & Dashboard
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── HeroBanner.vue
│   ├── SearchBar.vue
│   ├── AnnouncementTicker.vue
│   ├── NewsCard.vue
│   ├── ProjectCard.vue
│   ├── TechCard.vue
│   ├── StaffCard.vue
│   ├── FaqAccordion.vue
│   ├── AccessibilityToolbar.vue
│   └── admin/                 ← Admin Sidebar, StatCard, DataTable, RichEditor
├── server/
│   ├── api/                   ← REST API Handlers
│   └── utils/                 ← Prisma, Redis, JWT Helpers
└── i18n/
    └── locales/               ← Khmer (km.json) & English (en.json)
```

---

## 📄 License

Department of Information Technology Systems | Directorate General of GDPTR | Ministry of Public Works and Transport | **mpwt.dev**
