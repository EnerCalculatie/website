import { NavLink, Outlet } from 'react-router-dom';
import { HardDrive, LayoutDashboard } from 'lucide-react';

export function SuperadminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 p-4">
        <div className="p-3 mb-6">
          <h2 className="text-lg font-bold text-slate-800">Superadmin</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/superadmin"
                end // Zorgt ervoor dat deze alleen actief is op de exacte pad
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-base ${
                    isActive
                      ? 'bg-slate-200 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
                style={{ minHeight: '48px' }}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/superadmin/infrastructuur"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-base ${
                    isActive
                      ? 'bg-slate-200 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
                style={{ minHeight: '48px' }}
              >
                <HardDrive className="h-5 w-5" />
                Infrastructuur
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}