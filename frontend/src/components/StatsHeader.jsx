
import { Flame, CheckCircle2, FolderGit2 } from 'lucide-react';

export default function StatsHeader({
    userName = 'Developer',
    activeProjectsCount = 0,
    openTasksCount = 0,
    streakDays = 0,
    productivityScore = 0,
}) {
    // SVG circular calculation: radius = 34, perimeter = 2 * PI * 34 ≈ 213.6
    const radius = 34;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (productivityScore / 100) * circumference;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                {/* Left: User Welcome & Metrics */}
                <div className="space-y-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Welcome back, <span className="text-blue-400">{userName}</span> 👋
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Here is what is happening across your projects and tasks today.
                        </p>
                    </div>

                    {/* Dynamic Metrics Row */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Active Projects */}
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
                                <FolderGit2 className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-base font-bold text-white block leading-none">
                                    {activeProjectsCount}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                    Active Projects
                                </span>
                            </div>
                        </div>

                        {/* Open Tasks */}
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-base font-bold text-white block leading-none">
                                    {openTasksCount}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                    Open Tasks
                                </span>
                            </div>
                        </div>

                        {/* Dynamic Activity Streak */}
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                                <Flame className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-base font-bold text-white block leading-none">
                                    {streakDays} {streakDays === 1 ? 'day' : 'days'}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                    Active Streak
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Productivity Score Circular Indicator */}
                <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800 p-4 rounded-xl self-start lg:self-auto">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                            {/* Background Ring */}
                            <circle
                                cx="40"
                                cy="40"
                                r={radius}
                                className="stroke-slate-800"
                                strokeWidth="6"
                                fill="transparent"
                            />
                            {/* Progress Ring */}
                            <circle
                                cx="40"
                                cy="40"
                                r={radius}
                                className="stroke-blue-500 transition-all duration-700 ease-out"
                                strokeWidth="6"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                fill="transparent"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                            <span className="text-sm font-bold text-white leading-none">
                                {productivityScore}%
                            </span>
                        </div>
                    </div>

                    <div>
                        <span className="text-xs font-semibold text-white block">
                            Productivity
                        </span>
                        <p className="text-[11px] text-slate-400">
                            Completed ratio of all tracked tasks
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}