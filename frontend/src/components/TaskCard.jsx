
import { Folder, Calendar, Trash2, Edit3 } from 'lucide-react';

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
    const { title, project, dueDate, priority = 'Medium', status = 'todo' } = task;
    const taskId = task._id || task.id;
    const isCompleted = status.toLowerCase() === 'done';

    const priorityStyles = {
        High: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };

    const statusStyles = {
        todo: 'bg-slate-800 text-slate-400 border-slate-700',
        'in-progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };

    return (
        <div className="bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group">
            {/* Checkbox & Task Information */}
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggleStatus && onToggleStatus(taskId)}
                    className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />

                <div className="space-y-1.5 min-w-0">
                    <h4
                        className={`text-sm font-medium tracking-tight truncate transition-colors ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-100'
                            }`}
                    >
                        {title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-slate-400 truncate max-w-[200px]">
                            <Folder className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            {project || 'General'}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            {dueDate || 'No Due Date'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tags & Action Controls */}
            <div className="flex items-center gap-2 self-start sm:self-center pl-7 sm:pl-0 shrink-0">
                <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${priorityStyles[priority] || priorityStyles.Medium
                        }`}
                >
                    {priority} Priority
                </span>

                <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border capitalize ${statusStyles[status] || statusStyles.todo
                        }`}
                >
                    {status === 'in-progress' ? 'In-Progress' : status}
                </span>

                {onEdit && (
                    <button
                        type="button"
                        onClick={() => onEdit(task)}
                        className="p-1 text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors ml-1 cursor-pointer"
                        title="Edit Task"
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                    </button>
                )}

                {onDelete && (
                    <button
                        type="button"
                        onClick={() => onDelete(taskId)}
                        className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                        title="Delete Task"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
}