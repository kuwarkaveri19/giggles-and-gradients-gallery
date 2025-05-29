
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate('/home');
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-sm"></div>
      
      <Card className="relative w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl border-0 border-blue-200/50 hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            <span className="text-3xl">😂</span>
          </div>
          <div className="space-y-2">
            <img 
              src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=150&fit=crop&crop=center" 
              alt="Welcome to Joke Generator" 
              className="w-48 h-24 object-cover rounded-xl mx-auto shadow-md"
            />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
            Joke Generator
          </CardTitle>
          <CardDescription className="text-blue-700 text-lg font-medium">
            Welcome back! Ready for some professional laughs?
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-blue-50/50 border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-blue-800 placeholder:text-blue-600/70 backdrop-blur-sm hover:bg-blue-50 transition-all duration-300"
              />
            </div>
            
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-blue-50/50 border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-blue-800 placeholder:text-blue-600/70 backdrop-blur-sm hover:bg-blue-50 transition-all duration-300"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-6">
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
            
            <p className="text-center text-blue-700">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800 font-bold transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
              >
                Sign up here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
