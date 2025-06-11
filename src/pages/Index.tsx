
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Edit, Zap, Users, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered Generation",
      description: "Create high-quality articles with advanced AI technology that understands your niche and audience."
    },
    {
      icon: <Edit className="h-8 w-8" />,
      title: "Rich Text Editor",
      description: "Polish your content with our intuitive editor featuring formatting, images, and real-time preview."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Generate comprehensive articles in minutes, not hours. Boost your content creation speed."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-Audience Support",
      description: "Tailor content for different audiences - from casual readers to industry professionals."
    }
  ];

  const steps = [
    { number: "01", title: "Generate Outline", description: "Provide your topic and preferences" },
    { number: "02", title: "Create Article", description: "AI generates comprehensive content" },
    { number: "03", title: "Edit & Polish", description: "Refine with our rich text editor" },
    { number: "04", title: "Publish & Share", description: "Get shareable links and analytics" }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 rounded-lg flex items-center justify-center">
                <Edit className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ArticleGen</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
              <Link to="/signup" className="btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Create Amazing
              <span className="text-gradient block">Articles in Minutes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into compelling, well-structured articles with our AI-powered platform. 
              Perfect for bloggers, marketers, and content creators.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link to="/generate" className="btn-primary text-lg py-4 px-8 flex items-center justify-center gap-2 group">
                Start Creating Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/signup" className="btn-secondary text-lg py-4 px-8">
                Sign Up for More Features
              </Link>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="ml-4 text-sm text-gray-500">ArticleGen Platform</span>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Generate New Article</h3>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-brand-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-brand-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-2 h-2 bg-brand-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-10 bg-gray-100 rounded"></div>
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-10 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-20 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create professional, engaging articles that captivate your audience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-hover p-8 text-center group">
                <div className="text-brand-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From idea to published article in just four simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card-hover p-8 text-center h-full">
                  <div className="text-4xl font-bold text-gradient mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Content Creation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators who've already supercharged their content workflow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/generate" className="bg-white text-brand-blue-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group">
              Try Free Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/signup" className="border-2 border-white text-white hover:bg-white hover:text-brand-blue-600 font-medium py-4 px-8 rounded-lg transform hover:scale-[1.02] transition-all duration-200">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 rounded-lg flex items-center justify-center">
                <Edit className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">ArticleGen</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ArticleGen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
