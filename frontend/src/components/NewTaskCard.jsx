import { Plus } from 'lucide-react';

export default function NewTaskCard({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full min-h-[90px] bg-slate-950/40 hover:bg-slate-900/40 border border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 flex items-center justify-center gap-3 transition-all cursor-pointer"
        >
            <div className="w-8 h-8 rounded-full bg-slate-900 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 text-slate-400 flex items-center justify-center border border-slate-800 group-hover:border-indigo-500/30 transition-all">
                <Plus className="w-4 h-4" />
            </div>
            <div className="text-left">
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white block">
                    Create New Task
                </span>
                <span className="text-xs text-slate-500 block">
                    Add a deliverable and assign it to an active project
                </span>
            </div>
        </button>
    );
}