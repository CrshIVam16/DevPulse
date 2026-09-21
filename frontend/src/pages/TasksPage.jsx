import { useState, useMemo } from 'react';
import { CheckSquare, ChevronDown } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import NewTaskCard from '../components/NewTaskCard';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function TasksPage({
    tasks = [],
    projects = [], // Accepted to resolve unpopulated project IDs
    isLoading = false,
    searchQuery = '',
    onToggleStatus,
    onEditTask,
    onDeleteTask,
    onOpenCreateModal,
}) {
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    const statusTabs = [
        { label: 'All', value: 'all' },
        { label: 'Todo', value: 'todo' },
        { label: 'In-Progress', value: 'in-progress' },
        { label: 'Done', value: 'done' },
    ];

    // Helper: Safely resolve project name whether projectId is a populated object or a raw string ID
    const getProjectTitle = (task) => {
        if (typeof task.projectId === 'object' && task.projectId?.title) {
            return task.projectId.title;
        }
        const rawId = typeof task.projectId === 'string' ? task.projectId : task.projectId?._id;
        const matched = projects.find((p) => (p._id || p.id) === rawId);
        return matched ? matched.title : 'General';
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const projectName = getProjectTitle(task);

            const matchesSearch =
                task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                projectName.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === 'all' ||
                task.status?.toLowerCase() === statusFilter.toLowerCase();

            const matchesPriority =
                priorityFilter === 'all' ||
                task.priority?.toLowerCase() === priorityFilter.toLowerCase();

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [tasks, projects, searchQuery, statusFilter, priorityFilter]);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-indigo-400" />
                        <span>Tasks Console</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Track, filter, and complete sprint deliverables across all projects.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                        {statusTabs.map((tab) => (
                            <button
                                key={tab.value}
                                type="button"
                                onClick={() => setStatusFilter(tab.value)}
                                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors capitalize cursor-pointer ${statusFilter === tab.value
                                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="appearance-none bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium py-1.5 pl-3 pr-8 rounded-xl focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="all">Priority: All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
            </div>

            <NewTaskCard onClick={onOpenCreateModal} />

            {filteredTasks.length === 0 ? (
                <EmptyState
                    onReset={() => {
                        setStatusFilter('all');
                        setPriorityFilter('all');
                    }}
                />
            ) : (
                <div className="space-y-2.5">
                    {filteredTasks.map((task) => (
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
        </div>
    );
}