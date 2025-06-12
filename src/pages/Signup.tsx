
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the Terms of Service and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
        navigate('/login');
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isPasswordValid = passwordRequirements.every(req => req.met);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="max-w-md w-full">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transform hover:scale-105 transition-all duration-200">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Home
        </Link>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 animate-scale-in hover:shadow-2xl transition-shadow duration-300">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-200 hover:rotate-3">
              <Edit className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join thousands of content creators</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="mt-1 input-field focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all duration-200 hover:border-brand-blue-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 input-field focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all duration-200 hover:border-brand-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="input-field pr-10 focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all duration-200 hover:border-brand-blue-300"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm animate-fade-in" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                      <CheckCircle className={`h-4 w-4 transition-all duration-200 ${req.met ? 'text-green-500 scale-110' : 'text-gray-300'}`} />
                      <span className={`transition-colors duration-200 ${req.met ? 'text-green-600' : 'text-gray-500'}`}>{req.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="input-field pr-10 focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent transition-all duration-200 hover:border-brand-blue-300"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center space-x-2 text-sm animate-fade-in">
                  <CheckCircle className={`h-4 w-4 transition-all duration-200 ${passwordsMatch ? 'text-green-500 scale-110' : 'text-red-500'}`} />
                  <span className={`transition-colors duration-200 ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                className="mt-1 transition-all duration-200 hover:scale-105"
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                I agree to the{' '}
                <Link to="/terms" className="text-brand-blue-600 hover:text-brand-blue-700 transition-all duration-200 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-blue-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-brand-blue-600 hover:text-brand-blue-700 transition-all duration-200 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-blue-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button
                type="submit"
                disabled={isLoading || !isPasswordValid || !passwordsMatch || !agreeToTerms}
                className="w-full btn-primary relative transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:transform-none disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8 mb-6 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
          </div>

          {/* Guest Access */}
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link to="/generate" className="w-full btn-secondary block text-center transform hover:scale-105 active:scale-95 transition-all duration-200">
              Continue as Guest
            </Link>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            Already have an account?{' '}
            <Link to="/login" className="text-brand-blue-600 hover:text-brand-blue-700 font-medium transition-all duration-200 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-blue-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
