import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Home, PlusCircle, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/add', label: 'Agregar Juego', icon: PlusCircle },
    { path: '/stats', label: 'Estadísticas', icon: BarChart3 }
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
            <Gamepad2 size={32} className="text-white" />
            <span className="text-xl font-bold hidden sm:inline">Game Tracker</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isActive(path)
                  ? 'bg-green-500 bg-opacity-20 text-white'
                  : 'text-white hover:bg-green-700 hover:bg-opacity-10'
                  }`}
              >
                <Icon size={20} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;