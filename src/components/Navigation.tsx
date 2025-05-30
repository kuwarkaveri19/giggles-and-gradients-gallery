
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
    <nav className="bg-slate-50/30 backdrop-blur-lg shadow-xl border-b border-slate-200/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-xl">😂</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-slate-100 via-blue-50 to-slate-200 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
              Joke Generator
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/home"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium text-lg ${
                isActive('/home')
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-slate-50 shadow-lg scale-105'
                  : 'text-slate-100 hover:text-slate-50 hover:bg-slate-100/20 hover:scale-105 hover:shadow-md'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <Link
              to="/saved-jokes"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium text-lg ${
                isActive('/saved-jokes')
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-slate-50 shadow-lg scale-105'
                  : 'text-slate-100 hover:text-slate-50 hover:bg-slate-100/20 hover:scale-105 hover:shadow-md'
              }`}
            >
              <Heart size={20} />
              <span>Saved Jokes</span>
            </Link>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:bg-slate-100/20 transition-all duration-300 hover:scale-110">
                <Avatar className="h-12 w-12 border-2 border-slate-200/50 hover:border-slate-100/70 transition-all duration-300">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-slate-50 font-bold text-lg">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-slate-50/95 backdrop-blur-lg border-slate-200/30 shadow-2xl" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-3 bg-gradient-to-r from-slate-100 to-slate-50 rounded-t-lg">
                <p className="text-base font-bold text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 transition-all duration-300">
                  <User className="mr-3 h-5 w-5 text-blue-600" />
                  <span className="font-medium text-base">Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/saved-jokes" className="cursor-pointer md:hidden hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 transition-all duration-300">
                  <Heart className="mr-3 h-5 w-5 text-blue-600" />
                  <span className="font-medium text-base">Saved Jokes</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300">
                <LogOut className="mr-3 h-5 w-5" />
                <span className="font-medium text-base">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
