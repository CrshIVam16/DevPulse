import React from 'react';
import { Plus, Sparkles, Edit2, Trash2 } from 'lucide-react';

export function ProjectCard({ project, onOpenAiModal, onEdit, onDelete }) {
    const {
        title,
        description,
        status = 'Active',
        progress = 0,
        completedTasks = 0,
        totalTasks = 0,
    } = project;

    const isPlanning = (status || '').toLowerCase() === 'planning';

    return (
        <div className="bg-slate-900/60 border border-slate-800/90 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between transition-all group relative">
            <div>
                {/* Header: Title, Status Badge & Action Controls */}
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>

                    <div className="flex items-center gap-2 shrink-0">
                        <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${isPlanning
                                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                }`}
                        >
                            <span
                                className={`w-1.5 h-1.5 rounded-full ${isPlanning ? 'bg-purple-400' : 'bg-blue-400 animate-pulse'
                                    }`}
                            />
                            {status}
                        </span>

                        {/* Edit Project Button */}
                        {onEdit && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(project);
                                }}
                                className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800 transition-colors"
                                title="Edit project"
                            >
                                <Edit2 className="w-3.5 h-3.5" />
                            </button>
                        )}

                        {/* Delete Project Button */}
                        {onDelete && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(project._id || project.id);
                                }}
                                className="p-1 text-slate-500 hover:text-red-400 rounded hover:bg-red-500/10 transition-colors"
                                title="Delete project"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                    {description || 'No description provided.'}
                </p>

                {/* AI Decompose Button */}
                <div className="mb-5">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenAiModal) onOpenAiModal(project);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 active:scale-95 text-purple-300 border border-purple-500/30 hover:border-purple-500/50 rounded-lg text-xs font-medium transition-all cursor-pointer shadow-sm shadow-purple-500/10"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Generate AI Tasks</span>
                    </button>
                </div>
            </div>

            {/* Progress Footer */}
            <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Progress</span>
                    <span className="text-slate-300 font-semibold">
                        {progress}%{' '}
                        <span className="text-slate-500 font-normal">
                            ({completedTasks}/{totalTasks} tasks)
                        </span>
                    </span>
                </div>

                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export function NewProjectCard({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full min-h-[190px] bg-slate-950/40 hover:bg-slate-900/40 border border-dashed border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
        >
            <div className="w-10 h-10 rounded-full bg-slate-900 group-hover:bg-blue-500/10 group-hover:text-blue-400 text-slate-400 flex items-center justify-center border border-slate-800 group-hover:border-blue-500/30 transition-all">
                <Plus className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                New Project
            </span>
            <span className="text-xs text-slate-500">Initialize a new repository</span>
        </button>
    );
}