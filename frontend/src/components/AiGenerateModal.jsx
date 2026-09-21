import { useState } from 'react';
import { Sparkles, Loader2, X, CheckCircle, AlertCircle } from 'lucide-react';
import { aiApi } from '../services/api';

export default function AiGenerateModal({ project, isOpen, onClose, onTasksGenerated }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successCount, setSuccessCount] = useState(null);

    if (!isOpen || !project) return null;

    const handleGenerate = async () => {
        setLoading(true);
        setError('');
        setSuccessCount(null);

        try {
            // Calls POST /api/ai/generate-tasks
            const createdTasks = await aiApi.generateTasks(project._id || project.id);
            setSuccessCount(createdTasks.length);

            if (onTasksGenerated) {
                onTasksGenerated(createdTasks);
            }

            // Auto-close modal after 1.2s on success
            setTimeout(() => {
                setSuccessCount(null);
                onClose();
            }, 1200);
        } catch (err) {
            setError(err.message || 'Failed to decompose project with AI');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    disabled={loading}
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">AI Project Decomposition</h3>
                        <p className="text-xs text-slate-400">Powered by Inception Labs (Mercury-2)</p>
                    </div>
                </div>

                {/* Project Target Preview */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                    <span className="text-[10px] font-semibold tracking-wider text-purple-400 uppercase">Target Project</span>
                    <h4 className="text-sm font-semibold text-slate-200">{project.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{project.description || "No project description provided."}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                    The AI will analyze your project scope and automatically create prioritized, actionable subtasks directly on your board.
                </p>

                {/* Error Alert */}
                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Success Alert */}
                {successCount !== null && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <span>Successfully generated and saved {successCount} tasks!</span>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={loading || successCount !== null}
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Decomposing Tasks...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                <span>Generate Subtasks</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}