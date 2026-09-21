
import { useNavigate } from 'react-router-dom';
import {
    Sparkles,
    ArrowRight,
    Layers,
    FolderGit2,
    Cpu,
    ShieldCheck
} from 'lucide-react';
import { mockProjects, mockTasks } from '../data/mockData';
import { ProjectCard } from '../components/ProjectCard';
import TaskCard from '../components/TaskCard';

export default function LandingPage({ onOpenAuth, isAuthenticated }) {
    const navigate = useNavigate();

    const handleCtaClick = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            onOpenAuth();
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
            {/* Top Header Bar */}
            <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                            <Layers className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-white tracking-tight">DevPulse</span>
                            <span className="text-slate-600">|</span>
                            <span className="text-xs font-medium text-slate-400">Innovation Hacks</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleCtaClick}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                    >
                        {isAuthenticated ? 'Open Dashboard →' : 'Sign In / Register'}
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Full Stack Capstone • Innovation Hacks</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                    Ship faster. Track smart. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        Decompose sprints with AI.
                    </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    DevPulse is a full-stack developer productivity hub. Organize your repositories,
                    manage sprint deliverables, and generate intelligent task breakdowns powered by AI.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button
                        type="button"
                        onClick={handleCtaClick}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
                    >
                        <span>{isAuthenticated ? 'Enter Your Workspace' : 'Get Started Free'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                        href="#preview"
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm font-semibold rounded-xl transition-all"
                    >
                        Explore Live Preview
                    </a>
                </div>
            </section>

            {/* Features Value Pillars */}
            <section className="py-12 border-y border-slate-900 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                            <FolderGit2 className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white">Project Portfolios</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Track multi-repository progress with live task completion percentages and status badges.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                            <Cpu className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white">AI Task Generation</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Transform high-level project goals into actionable, prioritized subtasks automatically with AI.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white">User Data Isolation</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Secure JWT authentication and isolated MongoDB collections ensuring your workspace is private.
                        </p>
                    </div>
                </div>
            </section>

            {/* Live Interactive Preview (Sandbox) */}
            <section id="preview" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-2">
                    <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">Sandbox Preview</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Sample Workspace Dashboard</h2>
                    <p className="text-xs text-slate-400">
                        Sign in to create your own isolated workspace and persist data to MongoDB.
                    </p>
                </div>

                {/* Sample Projects */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                        <span>🚀</span> Sample Active Initiatives
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {mockProjects.slice(0, 3).map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>

                {/* Sample Tasks */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                        <span>⚡</span> Sample Sprint Deliverables
                    </h3>
                    <div className="space-y-2.5">
                        {mockTasks.slice(0, 3).map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onToggleStatus={() => { }} // Read-only demo on landing page
                            />
                        ))}
                    </div>
                </div>

                {/* Sign In CTA Banner */}
                <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/20 text-center space-y-4">
                    <h3 className="text-xl font-bold text-white">Ready to organize your workflow?</h3>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                        Create an account in 10 seconds to generate AI sprint tasks and save your projects permanently.
                    </p>
                    <button
                        type="button"
                        onClick={handleCtaClick}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all shadow-md cursor-pointer"
                    >
                        Create Your Account →
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-600">
                <p>DevPulse • Innovation Hacks Full Stack Internship Capstone (Task 4)</p>
            </footer>
        </div>
    );
}