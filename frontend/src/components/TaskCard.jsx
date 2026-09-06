import { Folder, Calendar } from 'lucide-react';

export default function TaskCard({ task, onToggleStatus }) {
    const { title, project, dueDate, priority, status } = task;
    const isCompleted = status.toLowerCase() === 'done';

    // Priority color formatting
    const priorityStyles = {
        High: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };

    // Status badge formatting
    const statusStyles = {
        todo: 'bg-slate-800 text-slate-400 border-slate-700',
        'in-progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };

    return (
        <div className="bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
            {/* Left: Checkbox + Title + Meta */}
            <div className="flex items-start gap-3.5">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggleStatus(task.id)}
                    className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />

                <div className="space-y-1.5">
                    <h4
                        className={`text-sm font-medium tracking-tight transition-colors ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-100'
                            }`}
                    >
                        {title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-slate-400">
                            <Folder className="w-3.5 h-3.5 text-slate-500" />
                            {project}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            {dueDate}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right: Priority and Status Tags */}
            <div className="flex items-center gap-2 self-start sm:self-center pl-7 sm:pl-0">
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
            </div>
        </div>
    );
}