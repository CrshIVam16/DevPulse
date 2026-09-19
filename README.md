# ⚡ DevPulse — Full Stack Developer Productivity Platform

**DevPulse** is a modern, full-stack developer productivity platform developed as part of the **Innovation Hacks Full Stack Development Internship**. The project follows an industry-oriented build progressing from a responsive frontend to a standalone REST API, followed by persistent database integration and AI capabilities.

![DevPulse Dashboard Preview](Screenshot%202026-08-29%20092430.png)
![DevPulse Task Management Preview](Screenshot%202026-08-29%20092441.png)

---

## 🗺️ Internship Progress & Milestones

- [x] **Task 1: Modern Frontend Development** (Completed)
- [x] **Task 2: Backend & REST API Development** (Completed)
- [x] **Task 3: Persistent Data Layer (Database Integration)** (Completed)
- [ ] **Task 4: AI-Powered Platform & Full-Stack Deployment** (Upcoming)

---

## 🚀 Task 1: Frontend Dashboard (Completed)

Built a single-page productivity dashboard emphasizing component reusability, responsive design, and robust UI edge states.

### Key Features
- **Developer Metrics & SVG Progress:** Visual header tracking active projects, commit streaks, open tasks, and an SVG-based dynamic circular productivity score.
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

Replaced temporary in-memory storage with a persistent database architecture powered by **MongoDB** and **Mongoose**, establishing schema-level constraints and relational document references[cite: 1, 3].

### Key Features
- **Relational Data Modeling:** Model relationships configured using Mongoose `ObjectId` references (`Task` referencing `User` and `Project`; `Project` referencing `User`)[cite: 1, 3].
- **Schema-Level Validation & Enums:** Enforced regex email checks, required title constraints, and status/priority enum whitelisting directly at the database layer[cite: 3].
- **Populated Native CRUD:** Upgraded controllers with asynchronous Mongoose queries (`find`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`) combined with `.populate()` lookups[cite: 3].
- **Database Seeder:** Created an automated database seeder (`src/config/seeder.js`) populating consistent test fixtures matching the frontend interface[cite: 1, 3].

### API Reference
| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health check route | `200` |
| `GET` | `/api/users/:id` | Fetch user profile & productivity score from DB | `200`, `404` |
| `PATCH` | `/api/users/:id` | Update user details (validated) | `200`, `404` |
| `GET` | `/api/projects` | List all projects (populated with user) | `200` |
| `GET` | `/api/projects/:id` | Fetch project by ID (populated with user) | `200`, `404` |
| `POST` | `/api/projects` | Create a persistent project document | `201`, `400` |
| `GET` | `/api/tasks` | Get tasks (supports `?status=`, `?priority=`, `?projectId=`) | `200` |
| `POST` | `/api/tasks` | Create task with relational foreign keys | `201`, `400` |
| `PUT` | `/api/tasks/:id` | Update task details & status in DB | `200`, `400`, `404` |
| `DELETE` | `/api/tasks/:id` | Permanently delete task document | `200`, `404` |

---

## 🔮 Upcoming Milestones

- **Task 4: AI Integration & Full-Stack Deployment**
  - Add user registration, login, and JWT-protected routes.
  - Integrate an AI service for automatic task generation, summarization, or priority recommendations.
  - Connect the React frontend to live backend endpoints and deploy the complete system to cloud hosting (Vercel & Render).

---

## 📁 Project Architecture

```text
DEVPULSE/
├── frontend/                     # Task 1: React + Vite SPA
│   ├── src/
│   │   ├── components/           # Modular UI components
│   │   ├── data/                 # Task 1 local mock datasets
│   │   ├── App.jsx               # State management & dynamic filtering
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Tasks 2 & 3: Express REST API + MongoDB
│   ├── src/
│   │   ├── config/               # Database connection (db.js) & seeder.js
│   │   ├── models/               # Mongoose Schemas (User, Project, Task)
│   │   ├── controllers/          # Asynchronous DB CRUD handlers
│   │   ├── routes/               # Express sub-routers
│   │   ├── middleware/           # Input validation & centralized error handlers
│   │   ├── app.js                # Express app setup & route mounting
│   │   └── server.js             # HTTP server entrypoint
│   ├── .env.example              # Environment variables template
│   └── package.json
│
├── .gitignore                    # Global ignore (node_modules, .env)
└── README.md
```

---

## ⚙️ Local Setup & Running the Project

**1. Clone the repository**

- git clone https://github.com/CrshIVam16/DevPulse.git
- cd DevPulse

**2. Frontend Setup (Task 1)**

- cd frontend
- npm install
- npm run dev

**3. Backend & DB Setup (Task 2)**

- cd backend
- npm install
- cp .env.example .env
- npm run seed
- npm run dev

---

## 🔗 Live Links

**Videos**

- [Task-1](https://drive.google.com/file/d/1MbvTNF2w0EB_2hszRwhUZnFN04ufCouV/view)
- [Task-2](https://drive.google.com/file/d/1VFpWbKJPlWHtbqnS1cWkO_DCG-acvsDs/view?usp=sharing)
- [Task-3](https://drive.google.com/file/d/1ph9oJakKwXxmIIaArei35DSGsWyXX3h-/view?usp=sharing)

**Live Project**

- [Live-Project](https://dev-pulse-seven-blue.vercel.app/)

---