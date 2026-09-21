import { useState } from "react";
import { CheckSquare, X } from "lucide-react";
import { taskApi } from "../services/api";

export default function NewTaskModal({ isOpen, onClose, projects, onTaskCreated }) {
    const [formData, setFormData] = useState({
        title: "",
        projectId: projects[0]?._id || "",
        priority: "Medium",
        dueDate: new Date().toISOString().split("T")[0],
        status: "todo",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedProjectId = formData.projectId || projects[0]?._id;
        if (!selectedProjectId) {
            setError("Please create a project first before creating tasks.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const newTask = await taskApi.create({
                ...formData,
                projectId: selectedProjectId,
            });
            onTaskCreated(newTask);
            setFormData({
                title: "",
                projectId: projects[0]?._id || "",
                priority: "Medium",
                dueDate: new Date().toISOString().split("T")[0],
                status: "todo",
            });
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
                        <CheckSquare className="w-5 h-5 text-indigo-400" />
                        <span>Create New Task</span>
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
                            placeholder="e.g. Set up JWT Auth Middleware"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                            Assign to Project
                        </label>
                        {projects.length === 0 ? (
                            <p className="text-xs text-amber-400/90 py-1">
                                ⚠️ You need to create at least one project first.
                            </p>
                        ) : (
                            <select
                                value={formData.projectId || projects[0]?._id}
                                onChange={(e) =>
                                    setFormData({ ...formData, projectId: e.target.value })
                                }
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                            >
                                {projects.map((p) => (
                                    <option key={p._id || p.id} value={p._id || p.id}>
                                        {p.title}
                                    </option>
                                ))}
                            </select>
                        )}
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
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
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
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || projects.length === 0}
                        className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg text-sm transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Creating..." : "Create Task"}
                    </button>
                </form>
            </div>
        </div>
    );
}