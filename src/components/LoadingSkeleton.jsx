export default function LoadingSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Project Card Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="h-40 bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
                    >
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="h-4 bg-slate-800 rounded w-1/3" />
                                <div className="h-4 bg-slate-800 rounded-full w-14" />
                            </div>
                            <div className="h-3 bg-slate-800/60 rounded w-3/4" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-slate-800 rounded w-1/4" />
                            <div className="h-1.5 bg-slate-800 rounded-full w-full" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Task Card Skeletons */}
            <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="h-16 bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3 w-1/2">
                            <div className="w-4 h-4 bg-slate-800 rounded shrink-0" />
                            <div className="space-y-2 w-full">
                                <div className="h-3.5 bg-slate-800 rounded w-3/5" />
                                <div className="h-2.5 bg-slate-800/60 rounded w-2/5" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-5 w-20 bg-slate-800 rounded-md" />
                            <div className="h-5 w-16 bg-slate-800 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}