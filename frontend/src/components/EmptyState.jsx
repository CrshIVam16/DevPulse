import { SearchX } from 'lucide-react';

export default function EmptyState({ onReset }) {
    return (
        <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl py-14 px-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 mb-4">
                <SearchX className="w-6 h-6" />
            </div>

            <h3 className="text-base font-semibold text-white tracking-tight mb-1">
                No tasks found
            </h3>

            <p className="text-xs text-slate-400 max-w-sm mb-6">
                We couldn't find any tasks matching your current filter and search criteria. Try adjusting your filters.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors cursor-pointer"
            >
                Clear Filters
            </button>
        </div>
    );
}