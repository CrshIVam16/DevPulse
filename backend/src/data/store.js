// Initial seed data matching our Task 1 frontend needs
export const users = [
  {
    id: "user-1",
    name: "Alex",
    email: "alex@devpulse.io",
    role: "Full Stack Intern",
    productivityScore: 85,
    streakDays: 5
  }
];

export const projects = [
  {
    id: "proj-1",
    title: "E-Commerce API",
    description: "Node.js backend with Stripe integration",
    status: "Active",
    userId: "user-1"
  },
  {
    id: "proj-2",
    title: "Dashboard UI Redux",
    description: "React components & Tailwind styling",
    status: "Planning",
    userId: "user-1"
  }
];

export const tasks = [
  {
    id: "task-1",
    title: "Implement OAuth2 Authentication Flow",
    projectId: "proj-1",
    userId: "user-1",
    dueDate: "2026-10-25",
    priority: "High",
    status: "in-progress"
  },
  {
    id: "task-2",
    title: "Optimize Database Queries for Products Endpoint",
    projectId: "proj-1",
    userId: "user-1",
    dueDate: "2026-10-26",
    priority: "Medium",
    status: "todo"
  },
  {
    id: "task-3",
    title: "Configure Tailwind Typography and Color Palette",
    projectId: "proj-2",
    userId: "user-1",
    dueDate: "2026-10-22",
    priority: "Low",
    status: "done"
  }
];