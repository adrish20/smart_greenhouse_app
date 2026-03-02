import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Leaf, Mail, Lock, User, MapPin, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Simple demo registration
    localStorage.setItem('greenhouse_auth', 'true');
    toast.success('Account created successfully!');
    
    // Use setTimeout to ensure localStorage is set before navigation
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 100);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 flex items-center justify-center px-4 py-8 overflow-auto relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-32 left-10 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-teal-300/10 rounded-full blur-2xl animate-float" />
      </div>

      <div className="w-full max-w-md my-auto relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-green-50 rounded-3xl mb-3 shadow-2xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 animate-shimmer" />
            <Leaf className="size-10 text-green-600 relative z-10 drop-shadow-sm" />
          </div>
          <h1 className="text-white mb-1 text-3xl drop-shadow-lg">Join GreenHouse</h1>
          <p className="text-green-50 text-sm flex items-center justify-center gap-1">
            <Sparkles className="size-4" />
            Start monitoring your greenhouse
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-7 border border-white/20">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Farmer"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="pl-12 h-13 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="pl-12 h-13 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">Location (Optional)</Label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Farm location"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="pl-12 h-13 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl transition-all"
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
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="pl-12 h-13 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  className="pl-12 h-13 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-13 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-[1.02] mt-6"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium underline-offset-2 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
