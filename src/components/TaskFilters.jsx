import { Search, ChevronDown } from 'lucide-react';

export default function TaskFilters({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
}) {
    const statusTabs = [
        { label: 'All', value: 'all' },
        { label: 'Todo', value: 'todo' },
        { label: 'In-Progress', value: 'in-progress' },
        { label: 'Done', value: 'done' },
    ];

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Section Title */}
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">⚡</span> Tasks
            </h2>

            {/* Filter and Search Bar Controls */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative min-w-50 flex-1 sm:flex-initial">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Filter tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-1">
                    {statusTabs.map((tab) => (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => setStatusFilter(tab.value)}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${statusFilter === tab.value
                                    ? 'bg-slate-800 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Priority Dropdown */}
                <div className="relative">
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="appearance-none bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium py-1.5 pl-3 pr-8 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                        <option value="all">Priority: All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}