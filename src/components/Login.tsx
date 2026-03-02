import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Leaf, Mail, Lock, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simple demo authentication
    localStorage.setItem('greenhouse_auth', 'true');
    toast.success('Login successful!');
    
    // Use setTimeout to ensure localStorage is set before navigation
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 100);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 flex items-center justify-center px-4 py-8 overflow-auto relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-32 right-10 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-teal-300/10 rounded-full blur-2xl animate-float" />
      </div>

      <div className="w-full max-w-md my-auto relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white to-green-50 rounded-3xl mb-4 shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 animate-shimmer" />
            <Leaf className="size-12 text-green-600 relative z-10 drop-shadow-sm" />
          </div>
          <h1 className="text-white mb-2 text-3xl drop-shadow-lg">GreenHouse Monitor</h1>
          <p className="text-green-50 text-sm flex items-center justify-center gap-1">
            <Sparkles className="size-4" />
            Manage your greenhouse remotely
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-gray-900 mb-6 text-center text-2xl">Welcome Back</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium underline-offset-2 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <p className="text-sm text-white/90">
            <Sparkles className="size-4 inline mr-1" />
            Demo: Use any email and password to login
          </p>
        </div>
      </div>
    </div>
  );
}
