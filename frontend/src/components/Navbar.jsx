import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LayersPlusIcon, Folder, CheckSquare, X, PanelLeft } from 'lucide-react';

export default function Navbar({
  searchTerm = '',
  setSearchTerm,
  user,
  onOpenAuth,
  onLogout,
  projects = [],
  tasks = [],
  onToggleSidebar,
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current && !searchRef.current.contains(e.target) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const query = searchTerm?.trim().toLowerCase() || '';
  const matchingProjects = query
    ? projects.filter((p) => p.title.toLowerCase().includes(query)).slice(0, 3)
    : [];
  const matchingTasks = query
    ? tasks.filter((t) => t.title.toLowerCase().includes(query)).slice(0, 4)
    : [];

  const hasResults = matchingProjects.length > 0 || matchingTasks.length > 0;

  const handleSelectProject = () => {
    setIsOpen(false);
    setIsMobileSearchOpen(false);
    navigate('/projects');
  };

  const handleSelectTask = () => {
    setIsOpen(false);
    setIsMobileSearchOpen(false);
    navigate('/tasks');
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Sidebar Toggle Button + DevPulse Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          {user && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Sidebar"
            >
              <PanelLeft className="w-5 h-5 stroke-[1.75]" />
            </button>
          )}

          <div
            onClick={() => navigate(user ? '/dashboard' : '/')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 group-hover:scale-105 transition-transform">
              <LayersPlusIcon className="w-4.5 h-4.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm sm:text-base text-white tracking-tight group-hover:text-blue-400 transition-colors">
                DevPulse
              </span>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
                Innovation Hacks
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div ref={searchRef} className="flex-1 max-w-lg mx-2 hidden md:block relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, tasks, or code..."
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Desktop Search Suggestions */}
          {isOpen && query && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-2 max-h-80 overflow-y-auto">
              {!hasResults ? (
                <div className="p-3 text-center text-xs text-slate-500">
                  No matching projects or tasks found.
                </div>
              ) : (
                <>
                  {matchingProjects.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Projects
                      </div>
                      {matchingProjects.map((p) => (
                        <div
                          key={p._id || p.id}
                          onClick={handleSelectProject}
                          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors text-xs text-slate-200"
                        >
                          <Folder className="w-4 h-4 text-blue-400 shrink-0" />
                          <span className="font-medium truncate">{p.title}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {matchingTasks.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Tasks
                      </div>
                      {matchingTasks.map((t) => (
                        <div
                          key={t._id || t.id}
                          onClick={handleSelectTask}
                          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors text-xs text-slate-200"
                        >
                          <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span className="font-medium truncate">{t.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: Mobile Search & Profile Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {user && (
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl md:hidden cursor-pointer"
            >
              {isMobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-800/80">
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                alt={user.name}
                className="w-8.5 h-8.5 rounded-full ring-1 ring-blue-500/30 object-cover shrink-0"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs sm:text-sm font-medium text-slate-200 leading-tight truncate max-w-[130px]">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-500 leading-tight truncate max-w-[130px]">
                  {user.role || 'Developer'}
                </span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="text-[11px] sm:text-xs bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-md shadow-blue-500/20"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div ref={mobileSearchRef} className="p-3 border-t border-slate-800/80 bg-slate-950 md:hidden relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Search projects or tasks..."
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-9 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isOpen && query && (
            <div className="mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 space-y-2 max-h-60 overflow-y-auto">
              {!hasResults ? (
                <div className="p-2 text-center text-xs text-slate-500">
                  No matching items found.
                </div>
              ) : (
                <>
                  {matchingProjects.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Projects
                      </div>
                      {matchingProjects.map((p) => (
                        <div
                          key={p._id || p.id}
                          onClick={handleSelectProject}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 cursor-pointer text-xs text-slate-200"
                        >
                          <Folder className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="font-medium truncate">{p.title}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {matchingTasks.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Tasks
                      </div>
                      {matchingTasks.map((t) => (
                        <div
                          key={t._id || t.id}
                          onClick={handleSelectTask}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 cursor-pointer text-xs text-slate-200"
                        >
                          <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="font-medium truncate">{t.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}