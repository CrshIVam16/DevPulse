import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsHeader from './components/StatsHeader';
import { ProjectCard, NewProjectCard } from './components/ProjectCard';
import TaskFilters from './components/TaskFilters';
import TaskCard from './components/TaskCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';

import { mockUserData, mockProjects, mockTasks } from './data/mockData';

export default function App() {
  const [tasks, setTasks] = useState(mockTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Toggle Task Completion State
  const handleToggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: t.status === 'done' ? 'in-progress' : 'done',
          };
        }
        return t;
      })
    );
  };

  // Reset Filters Callback
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  // Filter Tasks dynamically
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.project.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || task.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesPriority =
        priorityFilter === 'all' || task.priority.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white pb-16">
      {/* 1. Sticky Navigation */}
      <Navbar searchTerm={searchQuery} setSearchTerm={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* State Simulator Switch */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsLoading((prev) => !prev)}
            className="text-[11px] font-medium px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            Toggle Preview: {isLoading ? 'Showing Loading State' : 'Showing Data'}
          </button>
        </div>

        {/* 2. Hero Profile Metrics */}
        <StatsHeader
          userName={mockUserData.name}
          activeProjectsCount={mockUserData.activeProjectsCount}
          openTasksCount={tasks.filter((t) => t.status !== 'done').length}
          streakDays={mockUserData.streakDays}
          productivityScore={mockUserData.productivityScore}
        />

        {/* 3. Loading State Skeleton vs Loaded Data */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Active Projects Grid */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">🚀</span> Active Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {mockProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                <NewProjectCard onClick={() => alert('New Project modal trigger')} />
              </div>
            </section>

            {/* Task Management Section */}
            <section className="space-y-4">
              <TaskFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
              />

              {filteredTasks.length === 0 ? (
                <EmptyState onReset={handleResetFilters} />
              ) : (
                <div className="space-y-2.5">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}