import { Search, Bell, LayersPlusIcon } from 'lucide-react';

export default function Navbar({ searchTerm, setSearchTerm }) {


    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

                {/* Brand Logo */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                        <LayersPlusIcon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-white tracking-tight">DevPulse</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-xs font-medium text-slate-400 hidden sm:inline">Innovation Hacks</span>
                    </div>
                </div>

                {/* Global Search Bar */}
                <div className="flex-1 max-w-md mx-4 hidden md:block">
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search projects, tasks, or code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* Action Controls & User Avatar */}
                <div className="flex items-center gap-4 shrink-0">
                    <button
                        type="button"
                        aria-label="View notifications"
                        className="relative p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900 transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-950" />
                    </button>

                    <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                            alt="Alex Avatar"
                            className="w-8 h-8 rounded-full ring-1 ring-blue-500/30 object-cover"
                        />
                        <div className="hidden sm:flex flex-col text-left">
                            <span className="text-sm font-medium text-slate-200 leading-tight">Alex</span>
                            <span className="text-[11px] text-slate-500 leading-tight">Full Stack Intern</span>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}