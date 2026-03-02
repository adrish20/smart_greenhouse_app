import { Outlet, Link, useLocation, Navigate } from 'react-router';
import { Leaf, BarChart3, Sliders, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';

export function MainLayout() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated (simple check for demo)
    const auth = localStorage.getItem('greenhouse_auth');
    setIsAuthenticated(auth === 'true');
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <Leaf className="size-12 text-green-600 mx-auto mb-2 animate-pulse" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/controls', icon: Sliders, label: 'Controls' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 animate-shimmer" />
        <div className="flex items-center justify-between max-w-md mx-auto relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Leaf className="size-6 text-white drop-shadow-md" />
            </div>
            <div>
              <h1 className="text-white text-xl drop-shadow-sm">GreenHouse</h1>
              <p className="text-green-100 text-xs">Smart Monitor</p>
            </div>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('greenhouse_auth');
              window.location.href = '/login';
            }}
            className="text-xs text-green-100 hover:text-white transition-colors px-3 py-2 hover:bg-white/10 rounded-lg backdrop-blur-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        <div className="max-w-md mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t-2 border-gray-200 shadow-2xl">
        <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1.5 px-5 py-2 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'text-green-600 bg-green-50 scale-105' 
                    : 'text-gray-500 hover:text-green-500 hover:bg-gray-50'
                }`}
              >
                <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                  <Icon className={`size-6 ${isActive ? 'drop-shadow-md' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full" />
                  )}
                </div>
                <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}