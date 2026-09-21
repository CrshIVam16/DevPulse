import { useState, useEffect } from "react";
import { Lock, Mail, User, AlertCircle, LogIn, UserPlus, X, Briefcase, Camera } from "lucide-react";
import { authApi } from "../services/api";

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Full Stack Intern",
        avatarUrl: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "Full Stack Intern",
                avatarUrl: "",
            });
            setError("");
        }
    }, [isOpen, isLogin]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError("Image file size should be less than 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, avatarUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            let response;
            if (isLogin) {
                response = await authApi.login(formData.email, formData.password);
            } else {
                // Pass the full formData object directly
                response = await authApi.register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role || "Full Stack Intern",
                    avatarUrl: formData.avatarUrl,
                });
            }

            localStorage.setItem("devpulse_token", response.data.token);
            localStorage.setItem("devpulse_user", JSON.stringify(response.data));

            onAuthSuccess(response.data);
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
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex border-b border-slate-800 mb-6 pr-8">
                    <button
                        type="button"
                        onClick={() => { setIsLogin(true); setError(""); }}
                        className={`flex-1 pb-3 text-sm font-semibold transition-colors cursor-pointer ${isLogin ? "text-blue-500 border-b-2 border-blue-500" : "text-slate-400 hover:text-slate-200"
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsLogin(false); setError(""); }}
                        className={`flex-1 pb-3 text-sm font-semibold transition-colors cursor-pointer ${!isLogin ? "text-blue-500 border-b-2 border-blue-500" : "text-slate-400 hover:text-slate-200"
                            }`}
                    >
                        Create Account
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-xs text-red-400">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            {/* Picture Upload Preview */}
                            <div className="flex items-center gap-4 py-1">
                                <div className="relative w-14 h-14 rounded-full bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                                    {formData.avatarUrl ? (
                                        <img src={formData.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera className="w-6 h-6 text-slate-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-slate-300 mb-1">Profile Photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="block w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-blue-600/10 file:text-blue-400 hover:file:bg-blue-600/20 file:cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Alex Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Professional Role</label>
                                <div className="relative">
                                    <Briefcase className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        name="role"
                                        placeholder="e.g. Full Stack Developer, Frontend Lead"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="developer@devpulse.io"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="password"
                                name="password"
                                required
                                minLength={6}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? (
                            <span>Authenticating...</span>
                        ) : isLogin ? (
                            <>
                                <LogIn className="w-4 h-4" /> Sign In to Dashboard
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-4 h-4" /> Register Account
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}