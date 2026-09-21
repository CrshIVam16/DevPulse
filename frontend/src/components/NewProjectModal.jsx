import { useState } from "react";
import { FolderPlus, X } from "lucide-react";
import { projectApi } from "../services/api";

export default function NewProjectModal({ isOpen, onClose, onProjectCreated }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Active",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const newProject = await projectApi.create(formData);
            onProjectCreated(newProject);
            setFormData({ title: "", description: "", status: "Active" });
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-white font-semibold text-base">
                        <FolderPlus className="w-5 h-5 text-blue-500" />
                        <span>Create New Project</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-300 transition-colors"
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
                            Project Title
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. AI Notification Service"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            required
                            placeholder="Brief overview of the project scope..."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                            Initial Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Planning">Planning</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg text-sm transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Creating..." : "Create Project"}
                    </button>
                </form>
            </div>
        </div>
    );
}