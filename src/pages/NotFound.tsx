
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue-50 via-white to-brand-purple-50 animate-fade-in">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Animated 404 */}
        <div className="mb-8 animate-scale-in">
          <h1 className="text-8xl font-bold text-transparent bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 bg-clip-text animate-pulse">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-2xl font-semibold text-gray-900 mb-4">Oops! Page not found</p>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 group transform hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Go Back
          </Button>
          
          <Link to="/">
            <Button className="btn-primary transform hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex justify-center">
            <RefreshCw className="h-8 w-8 text-gray-300 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
