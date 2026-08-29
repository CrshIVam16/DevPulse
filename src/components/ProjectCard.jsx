import { Plus } from 'lucide-react';

export function ProjectCard({ project }) {
    const { title, description, status, progress, completedTasks, totalTasks } = project;

    return (
        <div className="bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-xl p-5 flex flex-col justify-between transition-all">
            <div>
                {/* Header: Title and Status Badge */}
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-white tracking-tight">
                        {title}
                    </h3>
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${status.toLowerCase() === 'active'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                            }`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${status.toLowerCase() === 'active' ? 'bg-blue-400 animate-pulse' : 'bg-purple-400'
                                }`}
                        />
                        {status}
                    </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-6">
                    {description}
                </p>
            </div>

            {/* Progress Bar & Counters */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Progress</span>
                    <span className="text-slate-300 font-semibold">
                        {/* {progress}% <span className="text-slate-500 font-normal">({completedTasks}/{totalTasks} tasks)</span> */}
                        {((completedTasks / totalTasks) * 100).toFixed(0)}% <span className="text-slate-500 font-normal">({completedTasks}/{totalTasks} tasks)</span>
                    </span>
                </div>

                {/* Dynamic Progress Track */}
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                        // style={{ width: `${progress}%` }}
                        style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

// Dashed Action Card
export function NewProjectCard({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full min-h-40 bg-slate-950/40 hover:bg-slate-900/40 border border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
        >
            <div className="w-9 h-9 rounded-full bg-slate-900 group-hover:bg-blue-500/10 group-hover:text-blue-400 text-slate-400 flex items-center justify-center border border-slate-800 group-hover:border-blue-500/30 transition-all">
                <Plus className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                New Project
            </span>
            <span className="text-xs text-slate-500">
                Initialize a new repository
            </span>
        </button>
    );
}