import { Folder, CheckSquare, Flame } from 'lucide-react';

export default function StatsHeader({
    userName = "Alex",
    activeProjectsCount = 3,
    openTasksCount = 12,
    streakDays = 5,
    productivityScore = 85
}) {
    // SVG circular progress calculation
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (productivityScore / 100) * circumference;

    return (
        <div className="w-full bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                {/* Left: Greeting and Stat Badges */}
                <div className="flex-1 space-y-6">
                    <div className="space-y-1.5">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            Welcome back, {userName}!
                        </h1>
                        <p className="text-sm sm:text-base text-slate-400">
                            You're maintaining a solid pace this week. Keep the momentum going.
                        </p>
                    </div>

                    {/* Metric Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex items-center gap-3.5 p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
                                <Folder className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-white block leading-tight">
                                    {activeProjectsCount}
                                </span>
                                <span className="text-xs text-slate-400 font-medium">Active Projects</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
                                <CheckSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-white block leading-tight">
                                    {openTasksCount}
                                </span>
                                <span className="text-xs text-slate-400 font-medium">Open Tasks</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg">
                            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                                <Flame className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-lg font-bold text-white block leading-tight">
                                    {streakDays}-day
                                </span>
                                <span className="text-xs text-slate-400 font-medium">Commit Streak</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Productivity Score Circular Indicator */}
                <div className="flex flex-col items-center justify-center shrink-0 self-center lg:self-auto">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                            {/* Background Ring */}
                            <circle
                                cx="64"
                                cy="64"
                                r={radius}
                                className="stroke-slate-800"
                                strokeWidth="10"
                                fill="transparent"
                            />
                            {/* Progress Ring with Gradient */}
                            <circle
                                cx="64"
                                cy="64"
                                r={radius}
                                className="transition-all duration-1000 ease-out"
                                stroke="url(#productivity-gradient)"
                                strokeWidth="10"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                fill="transparent"
                            />
                            <defs>
                                <linearGradient id="productivity-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Center Label */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-extrabold text-white tracking-tight">
                                {productivityScore}%
                            </span>
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mt-0.5">
                                Productivity<br />Score
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}