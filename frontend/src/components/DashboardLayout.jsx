import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  user,
  onLogout,
  onOpenAuth,
  searchQuery,
  setSearchQuery,
  projects = [],
  tasks = [],
  projectCount = 0,
  taskCount = 0,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white relative">
      {/* 1. Permanent Sticky Navbar with Sidebar Trigger */}
      <Navbar
        searchTerm={searchQuery}
        setSearchTerm={setSearchQuery}
        user={user}
        onOpenAuth={onOpenAuth}
        onLogout={onLogout}
        projects={projects}
        tasks={tasks}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {/* 2. Slide-Over Drawer */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        projectCount={projectCount}
        taskCount={taskCount}
      />

      {/* 3. Main Dashboard Content (Full width, zero rail offset) */}
      <main className="w-full max-w-7xl mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}