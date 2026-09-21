import { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Layout & Modals
import DashboardLayout from './components/DashboardLayout';
import AuthModal from './components/AuthModal';
import NewProjectModal from './components/NewProjectModal';
import EditProjectModal from './components/EditProjectModal';
import NewTaskModal from './components/NewTaskModal';
import EditTaskModal from './components/EditTaskModal';
import AiGenerateModal from './components/AiGenerateModal';

// Pages
import LandingPage from './pages/LandingPage';
import OverviewPage from './pages/OverviewPage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';

// API Services
import { projectApi, taskApi } from './services/api';

export default function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('devpulse_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Modals management
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // AI Task Generation Modal State
  const [aiTargetProject, setAiTargetProject] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const loadUserData = useCallback(async () => {
    if (!currentUser) {
      setProjects([]);
      setTasks([]);
      return;
    }

    setIsLoading(true);
    try {
      const [fetchedProjects, fetchedTasks] = await Promise.all([
        projectApi.getAll(),
        taskApi.getAll(),
      ]);
      setProjects(fetchedProjects);
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Error loading data from API:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleLogout = () => {
    localStorage.removeItem('devpulse_token');
    localStorage.removeItem('devpulse_user');
    setCurrentUser(null);
    setProjects([]);
    setTasks([]);
    navigate('/');
  };

  // Open AI modal for a specific project
  const handleOpenAiModal = (project) => {
    setAiTargetProject(project);
    setIsAiModalOpen(true);
  };

  // Callback when AI subtasks are created by Inception AI
  const handleAiTasksGenerated = (newGeneratedTasks) => {
    setTasks((prev) => [...newGeneratedTasks, ...prev]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) =>
        (t._id || t.id) === (updatedTask._id || updatedTask.id)
          ? { ...t, ...updatedTask }
          : t
      )
    );
  };

  // Toggle task status
  const handleToggleTaskStatus = async (id) => {
    const target = tasks.find((t) => (t._id || t.id) === id);
    if (!target) return;

    try {
      const updated = await taskApi.toggleStatus(target._id || target.id, target.status);
      setTasks((prev) =>
        prev.map((t) => ((t._id || t.id) === id ? updated : t))
      );
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await taskApi.delete(id);
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Deleting this project will also delete all its associated tasks. Continue?")) return;
    try {
      await projectApi.delete(id);
      setProjects((prev) => prev.filter((p) => (p._id || p.id) !== id));
      // Remove linked tasks from state
      setTasks((prev) =>
        prev.filter((t) => {
          const pId = typeof t.projectId === 'object' ? t.projectId?._id : t.projectId;
          return pId !== id;
        })
      );
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  // Update project in state
  const handleProjectUpdated = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) =>
        (p._id || p.id) === (updatedProject._id || updatedProject.id)
          ? { ...p, ...updatedProject }
          : p
      )
    );
  };

  // Project progress & dynamic task counters
  const enrichedProjects = useMemo(() => {
    return projects.map((project) => {
      const projectId = project._id || project.id;
      const linkedTasks = tasks.filter((t) => {
        const pId = typeof t.projectId === 'object' ? t.projectId?._id : t.projectId;
        return pId === projectId;
      });

      const completed = linkedTasks.filter((t) => t.status === 'done').length;
      const total = linkedTasks.length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        ...project,
        completedTasks: completed,
        totalTasks: total,
        progress,
      };
    });
  }, [projects, tasks]);

  return (
    <>
      <Routes>
        {/* Public Landing */}
        <Route
          path="/"
          element={
            <LandingPage
              onOpenAuth={() => setIsAuthOpen(true)}
              isAuthenticated={!!currentUser}
            />
          }
        />

        {/* Protected Shell: DashboardLayout wraps ALL 3 internal pages */}
        <Route
          element={
            currentUser ? (
              <DashboardLayout
                user={currentUser}
                onLogout={handleLogout}
                onOpenAuth={() => setIsAuthOpen(true)}
                searchQuery={globalSearch}
                setSearchQuery={setGlobalSearch}
                projects={enrichedProjects}
                tasks={tasks}
                projectCount={projects.length}
                taskCount={tasks.length}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route
            path="/dashboard"
            element={
              <OverviewPage
                user={currentUser}
                projects={enrichedProjects}
                tasks={tasks}
                isLoading={isLoading}
                searchQuery={globalSearch}
                onToggleStatus={handleToggleTaskStatus}
                onDeleteProject={handleDeleteProject}
                onDeleteTask={handleDeleteTask}
                onOpenAiModal={handleOpenAiModal}
              />
            }
          />

          <Route
            path="/projects"
            element={
              <ProjectsPage
                projects={enrichedProjects}
                isLoading={isLoading}
                searchQuery={globalSearch}
                onOpenCreateModal={() => setIsNewProjectOpen(true)}
                onEditProject={(project) => setEditingProject(project)}
                onDeleteProject={handleDeleteProject}
                onOpenAiModal={handleOpenAiModal}
              />
            }
            
          />
          <Route
            path="/tasks"
            element={
              <TasksPage
                tasks={tasks}
                projects={enrichedProjects} // Pass projects to resolve project names
                isLoading={isLoading}
                searchQuery={globalSearch}
                onToggleStatus={handleToggleTaskStatus}
                onEditTask={(task) => setEditingTask(task)}
                onDeleteTask={handleDeleteTask}
                onOpenCreateModal={() => setIsNewTaskOpen(true)}
              />
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          navigate('/dashboard');
        }}
      />

      {/* Project Creation & Edit Modals */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onProjectCreated={(newProject) =>
          setProjects((prev) => [newProject, ...prev])
        }
      />

      <EditProjectModal
        isOpen={!!editingProject}
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onProjectUpdated={handleProjectUpdated}
      />

      {/* Task Creation & Edit Modals */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        projects={projects}
        onTaskCreated={(newTask) =>
          setTasks((prev) => [newTask, ...prev])
        }
      />

      <EditTaskModal
        isOpen={!!editingTask}
        task={editingTask}
        projects={projects}
        onClose={() => setEditingTask(null)}
        onTaskUpdated={handleTaskUpdated}
      />

      {/* AI Task Decomposition Modal */}
      <AiGenerateModal
        project={aiTargetProject}
        isOpen={isAiModalOpen}
        onClose={() => {
          setIsAiModalOpen(false);
          setAiTargetProject(null);
        }}
        onTasksGenerated={handleAiTasksGenerated}
      />
    </>
  );
}