# ⚡ DevPulse — Full Stack Developer Productivity Platform

**DevPulse** is a modern, full-stack developer productivity platform developed as part of the **Innovation Hacks Full Stack Development Internship**. The project follows an industry-oriented build progressing from a responsive frontend to a standalone REST API, followed by persistent database integration and AI capabilities.

![DevPulse Dashboard Preview](Screenshot%202026-08-29%20092430.png)
![DevPulse Task Management Preview](Screenshot%202026-08-29%20092441.png)

---

## 🗺️ Internship Progress & Milestones

- [x] **Task 1: Modern Frontend Development** (Completed)
- [x] **Task 2: Backend & REST API Development** (Completed)
- [ ] **Task 3: Persistent Data Layer (Database Integration)** (Upcoming)
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

Designed and implemented a decoupled, modular Express.js REST API powering user metrics, projects, and task management with centralized error handling and strict input validation.

### Key Features
- **Modular Controller-Route Architecture:** Decoupled routes, controllers, and in-memory stateful store.
- **Task Lifecycle & Status Management:** Full CRUD handling for tasks, supporting status transitions (`todo`, `in-progress`, `done`) and query-based filtering.
- **Strict Input Validation:** Route-level middleware rejecting malformed payloads and invalid enum values before controller execution.
- **Centralized Error Handling:** Global error-handling middleware returning standardized JSON responses with accurate HTTP status codes (`200`, `201`, `400`, `404`, `500`).
- **Environment Security:** Isolated environment variable handling via `dotenv` and safe configuration templates.

### API Reference
| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health check route | `200` |
| `GET` | `/api/users/:id` | Fetch user profile & productivity score | `200`, `404` |
| `PATCH` | `/api/users/:id` | Update user details | `200`, `404` |
| `GET` | `/api/projects` | List all projects | `200` |
| `POST` | `/api/projects` | Create a new project (validated) | `201`, `400` |
| `GET` | `/api/tasks` | Get tasks (supports `?status=`, `?priority=`, `?projectId=`) | `200` |
| `POST` | `/api/tasks` | Create a new task (validated) | `201`, `400` |
| `PUT` | `/api/tasks/:id` | Update task details & status (validated) | `200`, `400`, `404` |
| `DELETE` | `/api/tasks/:id` | Delete task by ID | `200`, `404` |

---

## 🔮 Upcoming Milestones

- **Task 3: Persistent Data Layer**
  - Integrate a database (MongoDB / Mongoose) to replace the temporary in-memory store.
  - Implement relational schemas and data validation models linking Users, Projects, and Tasks.
- **Task 4: AI Integration & Full-Stack Deployment**
  - Add authentication and protected routes.
  - Integrate an AI service for automatic task generation and summarization.
  - Deploy the complete application to cloud hosting (Vercel / Render).

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
├── backend/                      # Task 2: Express REST API
│   ├── src/
│   │   ├── controllers/          # Business logic handlers
│   │   ├── routes/               # Express sub-routers
│   │   ├── middleware/           # Validation & centralized error handlers
│   │   ├── data/                 # Stateful in-memory store
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
- Frontend runs at: http://localhost:5173

**3. Backend Setup (Task 2)**

- cd backend
- npm install
- cp .env.example .env
- npm run dev
- Backend runs at: http://localhost:5000/api

**3. Live Links**
- [Demo-Video](https://drive.google.com/file/d/1MbvTNF2w0EB_2hszRwhUZnFN04ufCouV/view)
- [Live-Project](https://dev-pulse-seven-blue.vercel.app/)

---

## 🔗 Live Links

**Videos**

- [Task-1](https://drive.google.com/file/d/1MbvTNF2w0EB_2hszRwhUZnFN04ufCouV/view)
- [Task-2](https://drive.google.com/file/d/1VFpWbKJPlWHtbqnS1cWkO_DCG-acvsDs/view?usp=sharing)

**Live Project**

- [Live-Project](https://dev-pulse-seven-blue.vercel.app/)

---