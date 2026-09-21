
# ⚡ DevPulse — Full Stack AI Developer Productivity Platform

**DevPulse** is a modern, full-stack developer productivity platform developed as part of the **Innovation Hacks Full Stack Development Internship**. The project follows an industry-oriented build progressing from a responsive frontend to a standalone REST API, persistent database integration, and intelligent AI-powered project task decomposition with full production deployment.

![DevPulse Dashboard Preview](Screenshot%202026-08-29%20092430.png)
![DevPulse Task Management Preview](Screenshot%202026-08-29%20092441.png)

---

## 🗺️ Internship Progress & Milestones

- [x] **Task 1: Modern Frontend Development** (Completed)
- [x] **Task 2: Backend & REST API Development** (Completed)
- [x] **Task 3: Persistent Data Layer (Database Integration)** (Completed)
- [x] **Task 4: AI-Powered Platform & Full-Stack Deployment** (Completed)

---

## 🚀 Task 1: Frontend Dashboard (Completed)

Built a single-page productivity dashboard emphasizing component reusability, responsive design, and robust UI edge states.

### Key Features
- **Developer Metrics & SVG Progress:** Visual header tracking active projects, activity streaks, open tasks, and an SVG-based dynamic circular productivity score.
- **Project Showcase:** Status chips and dynamic progress tracking bars.
- **Task Management System:** Real-time multi-criteria filtering by text search, status tabs (*All, Todo, In-Progress, Done*), and priority levels (*High, Medium, Low*).
- **Interactive Checklists:** Instant completion status toggling that updates open task counters in real time.
- **Edge States:** Custom skeleton loading screens (`animate-pulse`) and zero-result empty state fallbacks with one-click reset.

### Tech Stack
- **Framework:** React.js + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React

---

## 🛠️ Task 2: Backend & REST API (Completed)

Designed and implemented a modular Express.js REST API powering user metrics, projects, and task lifecycles with centralized error handling and strict input validation[cite: 1, 2].

### Key Features
- **Modular Controller-Route Architecture:** Decoupled routes, controllers, and operational handlers following MVC standards[cite: 1, 2].
- **Task Lifecycle & Status Management:** Complete CRUD endpoints supporting status transitions (`todo`, `in-progress`, `done`) and query-based filtering (`?status=`, `?priority=`)[cite: 2].
- **Strict Input Validation:** Route-level middleware rejecting malformed payloads and invalid enum values with `400 Bad Request`[cite: 2].
- **Centralized Error Handling:** Global error-handling middleware returning standardized JSON responses with accurate HTTP status codes (`200`, `201`, `400`, `404`, `500`)[cite: 2].
- **Environment Security:** Isolated environment variable handling via `dotenv` with safe configuration templates (`.env.example`)[cite: 1, 2].

---

## 🗄️ Task 3: Persistent Data Layer (Completed)

Replaced temporary in-memory storage with a persistent database architecture powered by **MongoDB** and **Mongoose**, establishing schema-level constraints and relational document references[cite: 1].

### Key Features
- **Relational Data Modeling:** Model relationships configured using Mongoose `ObjectId` references (`Task` referencing `User` and `Project`; `Project` referencing `User`)[cite: 1].
- **Schema-Level Validation & Enums:** Enforced regex email checks, required title constraints, and status/priority enum whitelisting directly at the database layer.
- **Populated Native CRUD:** Upgraded controllers with asynchronous Mongoose queries (`find`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`) combined with `.populate()` lookups.
- **Database Seeder:** Created an automated database seeder (`src/config/seeder.js`) populating consistent test fixtures matching the frontend interface[cite: 1].

---

## 🧠 Task 4: AI Integration & Production Deployment (Completed)

Transformed the system into a complete production platform featuring JWT authentication, automated LLM sprint task decomposition, and live cloud deployment.

### Key Features
- **Full JWT Authentication & Roles:** Secure user registration, login, and `/api/auth/me` session recovery using `jsonwebtoken` and `bcryptjs` with protected route navigation.
- **Custom Profile Avatars:** Native Base64 photo storage and professional role title persistence rendered dynamically in the dashboard shell.
- **AI Task Decomposition (Inception Labs - Mercury-2):** Integrated an intelligent decomposition engine via the `openai` SDK (`POST /api/ai/generate-tasks`). Users can trigger one-click sprint planning from any project card, generating 3–5 actionable subtasks complete with priorities, calculated due dates, and direct MongoDB persistence.
- **Dynamic Activity Streak:** Replaced static values with real-time activity streak calculations derived from task update and creation timestamps.
- **End-to-End Cloud Deployment:** Deployed a production-ready web application with automated CORS handling, environment isolation, and continuous delivery.

### API Reference
| Method | Endpoint | Description | Auth Required | Status Codes |
| :--- | :--- | :--- | :---: | :--- |
| `GET` | `/api/health` | Health check endpoint | No | `200` |
| `POST` | `/api/auth/register` | Register new user with avatar & role | No | `201`, `400` |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT | No | `200`, `400`, `401` |
| `GET` | `/api/auth/me` | Fetch active authenticated user session | Yes (`Bearer`) | `200`, `401` |
| `GET` | `/api/projects` | Get all projects owned by user | Yes (`Bearer`) | `200`, `401` |
| `POST` | `/api/projects` | Create a new project repository | Yes (`Bearer`) | `201`, `400`, `401` |
| `PUT` | `/api/projects/:id` | Update project metadata and status | Yes (`Bearer`) | `200`, `400`, `404` |
| `DELETE`| `/api/projects/:id` | Delete project and cascade linked tasks | Yes (`Bearer`) | `200`, `404` |
| `GET` | `/api/tasks` | Get all tasks (supports query filtering) | Yes (`Bearer`) | `200`, `401` |
| `POST` | `/api/tasks` | Create manual development task | Yes (`Bearer`) | `201`, `400`, `401` |
| `PUT` | `/api/tasks/:id` | Update task details or toggle status | Yes (`Bearer`) | `200`, `400`, `404` |
| `DELETE`| `/api/tasks/:id` | Permanently delete a task | Yes (`Bearer`) | `200`, `404` |
| `POST` | `/api/ai/generate-tasks` | Decompose project into subtasks via Mercury-2 | Yes (`Bearer`) | `201`, `400`, `502` |

---

## 📁 Project Architecture

```text
DEVPULSE/
├── frontend/                         # React + Vite Production SPA
│   ├── src/
│   │   ├── components/               # UI components & Modals
│   │   │   ├── AiGenerateModal.jsx   # Inception AI Task Generation Modal
│   │   │   ├── AuthModal.jsx         # Login & Registration Drawer
│   │   │   ├── DashboardLayout.jsx   # Topbar, rail & responsive canvas
│   │   │   ├── EditProjectModal.jsx  # Update project details
│   │   │   ├── EditTaskModal.jsx     # Update task details
│   │   │   ├── EmptyState.jsx        # Fallback state component
│   │   │   ├── LoadingSkeleton.jsx   # Pulse loader placeholder
│   │   │   ├── Navbar.jsx            # Dynamic navigation header
│   │   │   ├── NewProjectModal.jsx   # Create repository modal
│   │   │   ├── NewTaskCard.jsx       # Quick add task card
│   │   │   ├── NewTaskModal.jsx      # Detailed task creation
│   │   │   ├── ProjectCard.jsx       # Project card with AI trigger
│   │   │   ├── StatsHeader.jsx       # Dynamic streaks & productivity ring
│   │   │   └── TaskCard.jsx          # Interactive checklist item
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx       # Public marketing page
│   │   │   ├── OverviewPage.jsx      # Dashboard with dynamic activity stats
│   │   │   ├── ProjectsPage.jsx      # Project portfolio & AI generation
│   │   │   └── TasksPage.jsx         # Full tasks console & filter pills
│   │   ├── services/
│   │   │   └── api.js                # Centralized REST & AI client
│   │   ├── App.jsx                   # Route provider & top-level state
│   │   ├── main.jsx                  # Entry point with BrowserRouter
│   │   └── index.css                 # Tailwind CSS styles
│   ├── package.json
│   └── vite.config.js
│
├── backend/                          # Express REST API + MongoDB + LLM
│   ├── src/
│   │   ├── config/                   # MongoDB connection & fixture seeder
│   │   ├── controllers/              # Auth, Project, Task & AI controllers
│   │   ├── middleware/               # JWT guard, error handling, validators
│   │   ├── models/                   # Schemas (User, Project, Task)
│   │   ├── routes/                   # Feature sub-routers (/auth, /projects, /tasks, /ai)
│   │   ├── app.js                    # Express app configuration & middleware
│   │   └── server.js                 # HTTP server runner
│   ├── .env.example                  # Environment configuration template
│   └── package.json
│
├── .gitignore
└── README.md

```

---

## ⚙️ Local Setup & Running the Project

**1. Clone the repository**

```bash
git clone [https://github.com/CrshIVam16/DevPulse.git](https://github.com/CrshIVam16/DevPulse.git)
cd DevPulse

```

**2. Backend Setup**

```bash
cd backend
npm install
cp .env.example .env

```

Configure your `backend/.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/devpulse
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
INCEPTION_API_KEY=your_inception_labs_api_key_here

```

Seed initial fixtures and run the development server:

```bash
npm run seed
npm run dev

```

**3. Frontend Setup**

```bash
cd ../frontend
npm install

```

Optionally configure `frontend/.env` (defaults to `http://localhost:5000/api` if omitted):

```env
VITE_API_BASE_URL=http://localhost:5000/api

```

Start the Vite development server:

```bash
npm run dev

```

---

## 🔗 Live Links

**Milestone Demonstration Videos**

* [Task 1: Modern Frontend Development](https://drive.google.com/file/d/1MbvTNF2w0EB_2hszRwhUZnFN04ufCouV/view?utm_source=gemini)
* [Task 2: REST API & Backend Architecture](https://drive.google.com/file/d/1VFpWbKJPlWHtbqnS1cWkO_DCG-acvsDs/view?usp=sharing&utm_source=gemini)
* [Task 3: Persistent Database Layer](https://drive.google.com/file/d/1ph9oJakKwXxmIIaArei35DSGsWyXX3h-/view?usp=sharing&utm_source=gemini)
* [Task 4: Full-Stack AI Platform & Deployment](https://drive.google.com/?utm_source=gemini)

**Production Deployment**

* [Live Application (Vercel)](https://dev-pulse-seven-blue.vercel.app/?utm_source=gemini)

```

```