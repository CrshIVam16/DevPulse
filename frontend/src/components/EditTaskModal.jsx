import { useState, useEffect } from 'react';
import { Edit3, X } from 'lucide-react';

export default function EditTaskModal({ isOpen, onClose, task, projects, onTaskUpdated }) {
    const [formData, setFormData] = useState({
        title: '',
        projectId: '',
        priority: 'Medium',
        dueDate: '',
        status: 'todo',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            const pId = typeof task.projectId === 'object' ? task.projectId?._id : task.projectId;
            setFormData({
                title: task.title || '',
                projectId: pId || projects[0]?._id || '',
                priority: task.priority || 'Medium',
                dueDate: task.dueDate || '',
                status: task.status || 'todo',
            });
            setError('');
        }
    }, [task, projects, isOpen]);

    if (!isOpen || !task) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const taskId = task._id || task.id;
            const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('devpulse_token')}`,
                },
                body: JSON.stringify(formData),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json?.error?.message || 'Failed to update task');

            onTaskUpdated(json.data);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-white font-semibold text-base">
                        <Edit3 className="w-5 h-5 text-indigo-400" />
                        <span>Edit Task</span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                            Task Title
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                            Assigned Project
                        </label>
                        <select
                            value={formData.projectId}
                            onChange={(e) =>
                                setFormData({ ...formData, projectId: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            {projects.map((p) => (
                                <option key={p._id || p.id} value={p._id || p.id}>
                                    {p.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">
                                Priority
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) =>
                                    setFormData({ ...formData, priority: e.target.value })
                                }
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, dueDate: e.target.value })
                                }
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="todo">Todo</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg text-sm transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Saving Changes...' : 'Save Task Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}