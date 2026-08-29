
# 📝 DevPulse — Developer Productivity Dashboard

A modern, responsive Developer Productivity Dashboard built with **React**, **Tailwind CSS**, and **Vite** as part of the **Innovation Hacks Full Stack Development Internship (Task 1)**.

![alt text](<Screenshot 2026-08-29 092430.png>)
![alt text](<Screenshot 2026-08-29 092441.png>)
---

## 🚀 Features

- **Profile & Productivity Tracking**: Real-time overview of active projects, commit streaks, open tasks, and an SVG-based circular productivity score.
- **Active Projects Showcase**: Dynamic project cards showing completion progress, total tasks, and active status indicators.
- **Task Management System**: Real-time multi-criteria filtering (search by title/project, filter by status: *All, Todo, In-Progress, Done*, and filter by priority: *High, Medium, Low*).
- **Interactive Checklists**: Real-time status toggling directly updates open task metrics.
- **Robust UI States**: Built-in loading skeletons (`animate-pulse`) and custom empty-state fallbacks for unmatched queries.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop viewports.
- [Demo-Video](https://drive.google.com/file/d/1MbvTNF2w0EB_2hszRwhUZnFN04ufCouV/view)
- [Live-Project](https://dev-pulse-seven-blue.vercel.app/)
---

## 🛠️ Tech Stack

- **Framework**: [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Component Architecture

```text
src/
├── components/
│   ├── Navbar.jsx          # Accessible top navigation & global search
│   ├── StatsHeader.jsx     # Profile summary, metrics, & dynamic SVG score ring
│   ├── ProjectCard.jsx     # Project cards with dynamic progress bars
│   ├── TaskCard.jsx        # Task item with priority/status tags & toggle
│   ├── TaskFilters.jsx     # Live search input, status tabs, & priority dropdown
│   ├── LoadingSkeleton.jsx # Pulse skeleton loaders for projects & tasks
│   └── EmptyState.jsx      # Zero-result fallback view with reset action
├── data/
│   └── mockData.js         # Structured mock datasets
├── App.jsx                 # Centralized state management & dynamic filtering
├── main.jsx
└── index.css
```

---

## ⚙️ Getting Started & Installation

**1. Clone the repository**

- git clone https://github.com/CrshIVam16/DevPulse.git

**2. Install dependencies**

- npm install

**3. Run the development server**

- npm run dev

---
