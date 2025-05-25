
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ET</span>
              </div>
              <span className="font-bold text-xl text-gray-900">ExpenseTracker</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="font-medium text-gray-700 hidden sm:block">John Doe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Dashboard
            </Link>
            <Link to="/expenses" className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Expenses
            </Link>
            <Link to="/reports" className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Reports
            </Link>
            <Link to="/settings" className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
