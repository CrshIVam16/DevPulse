
export const mockUserData = {
  name: "Alex",
  role: "Full Stack Intern",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  productivityScore: 70,
  activeProjectsCount: 3,
  openTasksCount: 4,
  streakDays: 5,
};

export const mockProjects = [
  {
    id: "proj-1",
    title: "E-Commerce API",
    description: "Node.js backend with Stripe integration",
    status: "Active",
    progress: 75,
    completedTasks: 6,
    totalTasks: 8,
  },
  {
    id: "proj-2",
    title: "Dashboard UI Redux",
    description: "React components & Tailwind styling",
    status: "Planning",
    progress: 30,
    completedTasks: 3,
    totalTasks: 10,
  },
  {
    id: "proj-3",
    title: "AI Integration Engine",
    description: "Microservice for prompt generation and task automation",
    status: "Active",
    progress: 50,
    completedTasks: 2,
    totalTasks: 4,
  }
];

export const mockTasks = [
  {
    id: "task-1",
    title: "Implement OAuth2 Authentication Flow",
    project: "Core Backend",
    dueDate: "Due Oct 25",
    priority: "High",       // 'High' | 'Medium' | 'Low'
    status: "in-progress",  // 'todo' | 'in-progress' | 'done'
  },
  {
    id: "task-2",
    title: "Optimize Database Queries for Products Endpoint",
    project: "E-Commerce API",
    dueDate: "Due Oct 26",
    priority: "Medium",
    status: "todo",
  },
  {
    id: "task-3",
    title: "Setup MongoDB Schema and Indexes",
    project: "Core Backend",
    dueDate: "Due Oct 27",
    priority: "High",
    status: "todo",
  },
  {
    id: "task-4",
    title: "Build Reusable UI Loading Skeletons",
    project: "Dashboard UI",
    dueDate: "Due Oct 28",
    priority: "Medium",
    status: "in-progress",
  },
  {
    id: "task-5",
    title: "Configure Tailwind Typography and Color Palette",
    project: "Dashboard UI",
    dueDate: "Due Oct 22",
    priority: "Low",
    status: "done",
  }
];