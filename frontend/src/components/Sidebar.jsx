
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderGit2, 
  CheckSquare, 
  Sparkles 
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, projectCount = 0, taskCount = 0 }) {
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/projects', label: 'Projects', icon: FolderGit2, count: projectCount },
    { to: '/tasks', label: 'Tasks', icon: CheckSquare, count: taskCount },
  ];

  const handleRouteClick = (to) => {
    navigate(to);
    onClose();
  };

  return (
    <>
      {/* 1. Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* 2. Slide-Over Drawer */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800/90 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-4">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 pt-2">
            Navigation
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => handleRouteClick(item.to)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                    }`
                  }
                >
                  <Icon className="w-4.5 h-4.5 min-w-[18px] min-h-[18px] shrink-0 stroke-[1.75]" />
                  <div className="flex-1 flex items-center justify-between overflow-hidden">
                    <span className="truncate">{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                        {item.count}
                      </span>
                    )}
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* AI Assistant Banner */}
        <div className="p-3.5 m-3.5 bg-gradient-to-br from-blue-950/40 to-indigo-950/40 border border-blue-500/20 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Generate prioritized subtasks automatically for any project.
          </p>
        </div>
      </aside>
    </>
  );
}