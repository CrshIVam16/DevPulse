import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import StatsHeader from '../components/StatsHeader';
import { ProjectCard } from '../components/ProjectCard';
import TaskCard from '../components/TaskCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

// Consecutive day streak calculation based on task timestamps
const calculateStreakDays = (tasks = []) => {
    if (!tasks.length) return 0;

    const activeDates = new Set();
    tasks.forEach((t) => {
        if (t.createdAt) activeDates.add(t.createdAt.split('T')[0]);
        if (t.updatedAt) activeDates.add(t.updatedAt.split('T')[0]);
    });

    let streak = 0;
    const cursor = new Date();

    const todayStr = cursor.toISOString().split('T')[0];
    if (!activeDates.has(todayStr)) {
        cursor.setDate(cursor.getDate() - 1);
    }

    while (true) {
        const dateStr = cursor.toISOString().split('T')[0];
        if (activeDates.has(dateStr)) {
            streak += 1;
            cursor.setDate(cursor.getDate() - 1);
        } else {
            break;
        }
    }

    return Math.max(streak, tasks.length > 0 ? 1 : 0);
};

export default function OverviewPage({
    user,
    projects = [],
    tasks = [],
    isLoading = false,
    searchQuery = '',
    onToggleStatus,
    onEditTask,
    onDeleteTask,
    onEditProject,
    onDeleteProject,
    onOpenAiModal,
}) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'done').length;
    const productivityScore =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const dynamicStreak = useMemo(() => calculateStreakDays(tasks), [tasks]);

    const getProjectTitle = (task) => {
        if (typeof task.projectId === 'object' && task.projectId?.title) {
            return task.projectId.title;
        }
        const rawId = typeof task.projectId === 'string' ? task.projectId : task.projectId?._id;
        const matched = projects.find((p) => (p._id || p.id) === rawId);
        return matched ? matched.title : 'General';
    };

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            return (
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [projects, searchQuery]);

    const filteredFocusTasks = useMemo(() => {
        return tasks
            .filter((t) => t.status !== 'done')
            .filter((task) => {
                const projectName = getProjectTitle(task);
                return (
                    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    projectName.toLowerCase().includes(searchQuery.toLowerCase())
                );
            })
            .slice(0, 5);
    }, [tasks, projects, searchQuery]);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="space-y-10">
            {/* 1. Metric Header */}
            <StatsHeader
                userName={user?.name || 'Developer'}
                activeProjectsCount={projects.length}
                openTasksCount={totalTasks - completedTasks}
                streakDays={dynamicStreak}
                productivityScore={productivityScore}
            />

            {/* 2. AI Quick Action Banner */}
            <div className="p-5 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/60 border border-blue-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span>AI Sprint Planner</span>
                    </div>
                    <p className="text-xs text-slate-400">
                        Have a new project idea? Let AI decompose your goals into structured development tasks.
                    </p>
                </div>

                <Link
                    to="/projects"
                    className="self-start sm:self-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                    <span>Open Projects to Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* 3. Recent Projects */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                        <span className="text-blue-400">🚀</span> Recent Projects
                    </h2>
                    <Link
                        to="/projects"
                        className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
                    >
                        <span>View All ({projects.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {filteredProjects.length === 0 ? (
                    <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-slate-400 text-xs">
                        {searchQuery
                            ? `No projects found matching "${searchQuery}".`
                            : 'No active projects yet. Visit the Projects page to initialize your first repository.'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredProjects.slice(0, 3).map((project) => (
                            <ProjectCard
                                key={project._id || project.id}
                                project={project}
                                onEdit={() => onEditProject && onEditProject(project)}
                                onDelete={() => onDeleteProject && onDeleteProject(project._id || project.id)}
                                onOpenAiModal={onOpenAiModal}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* 4. Focus Tasks */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                        <span className="text-indigo-400">⚡</span> Focus Tasks (Next Up)
                    </h2>
                    <Link
                        to="/tasks"
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
                    >
                        <span>Open Tasks Console</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {filteredFocusTasks.length === 0 ? (
                    <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-slate-400 text-xs">
                        {searchQuery
                            ? `No pending focus tasks found matching "${searchQuery}".`
                            : 'All caught up! No pending tasks require immediate focus.'}
                    </div>
                ) : (
                    <div className="space-y-2.5">
                        {filteredFocusTasks.map((task) => (
                            <TaskCard
                                key={task._id || task.id}
                                task={{
                                    ...task,
                                    id: task._id || task.id,
                                    project: getProjectTitle(task),
                                }}
                                onToggleStatus={onToggleStatus}
                                onEdit={onEditTask}
                                onDelete={onDeleteTask}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}