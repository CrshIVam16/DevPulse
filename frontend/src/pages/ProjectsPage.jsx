import { useState, useMemo } from 'react';
import { Plus, Search, FolderKanban } from 'lucide-react';
import { ProjectCard, NewProjectCard } from '../components/ProjectCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function ProjectsPage({
    projects = [],
    isLoading = false,
    searchQuery = '',
    onOpenCreateModal,
    onEditProject,
    onDeleteProject,
    onOpenAiModal, // Received from App.jsx
}) {
    const [statusFilter, setStatusFilter] = useState('All');

    const filterTabs = ['All', 'Active', 'Planning', 'Completed'];

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesStatus =
                statusFilter === 'All' ||
                (project.status && project.status.toLowerCase() === statusFilter.toLowerCase());

            return matchesSearch && matchesStatus;
        });
    }, [projects, searchQuery, statusFilter]);

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-slate-800/60 rounded w-48" />
                <LoadingSkeleton />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                        <FolderKanban className="w-7 h-7 text-blue-500" />
                        Project Portfolio
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Manage repositories, track deliverables, and decompose sprints.
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 self-start sm:self-auto">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setStatusFilter(tab)}
                            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${statusFilter === tab
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((project) => (
                    <ProjectCard
                        key={project._id || project.id}
                        project={project}
                        onEdit={() => onEditProject && onEditProject(project)}
                        onDelete={() => onDeleteProject && onDeleteProject(project._id || project.id)}
                        onOpenAiModal={onOpenAiModal} // Hooked directly to card
                    />
                ))}

                {/* Add Project Card */}
                <NewProjectCard onClick={onOpenCreateModal} />
            </div>
        </div>
    );
}