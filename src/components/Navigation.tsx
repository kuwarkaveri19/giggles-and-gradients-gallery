
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Heart, Home } from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/20 backdrop-blur-lg shadow-xl border-b border-white/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-xl">😂</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
              Joke Generator
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/home"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                isActive('/home')
                  ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'text-white/90 hover:text-white hover:bg-white/20 hover:scale-105 hover:shadow-md'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link
              to="/saved-jokes"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                isActive('/saved-jokes')
                  ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'text-white/90 hover:text-white hover:bg-white/20 hover:scale-105 hover:shadow-md'
              }`}
            >
              <Heart size={18} />
              <span>Saved Jokes</span>
            </Link>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Avatar className="h-12 w-12 border-2 border-white/30 hover:border-white/50 transition-all duration-300">
                  <AvatarFallback className="bg-gradient-to-r from-red-500 to-blue-600 text-white font-bold text-lg">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-3 bg-gradient-to-r from-purple-50 to-white rounded-t-lg">
                <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-white transition-all duration-300">
                  <User className="mr-3 h-5 w-5 text-purple-600" />
                  <span className="font-medium">Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/saved-jokes" className="cursor-pointer md:hidden hover:bg-gradient-to-r hover:from-purple-50 hover:to-white transition-all duration-300">
                  <Heart className="mr-3 h-5 w-5 text-purple-600" />
                  <span className="font-medium">Saved Jokes</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300">
                <LogOut className="mr-3 h-5 w-5" />
                <span className="font-medium">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
