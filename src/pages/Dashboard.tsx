
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus, BarChart3, Clock, TrendingUp, FileText, Settings, LogOut, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  status: string;
  created_at: string;
  content: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchArticles();
  }, [user, navigate]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Failed to load articles.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    { title: "Articles Created", value: articles.length.toString(), icon: <FileText className="h-5 w-5" />, change: "+12%" },
    { title: "Total Views", value: "15.2K", icon: <BarChart3 className="h-5 w-5" />, change: "+8%" },
    { title: "Avg. Read Time", value: "3.2 min", icon: <Clock className="h-5 w-5" />, change: "+5%" },
    { title: "Engagement Rate", value: "68%", icon: <TrendingUp className="h-5 w-5" />, change: "+15%" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center animate-fade-in">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 group transform hover:scale-105 transition-all duration-200">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Home
              </Link>
              <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-8 h-8 bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                  <Edit className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">ArticleGen</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/generate" className="btn-primary transform hover:scale-105 active:scale-95 transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">{user?.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut} className="transform hover:scale-105 active:scale-95 transition-all duration-200">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Here's what's happening with your content today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className="text-brand-blue-600 bg-brand-blue-50 p-3 rounded-lg transform hover:scale-110 transition-transform duration-200">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <CardTitle>Recent Articles</CardTitle>
                <CardDescription>Your latest content and drafts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.length === 0 ? (
                    <div className="text-center py-8 animate-fade-in">
                      <p className="text-gray-500 mb-4">No articles yet. Create your first one!</p>
                      <Link to="/generate">
                        <Button className="btn-primary transform hover:scale-105 active:scale-95 transition-all duration-200">
                          <Plus className="h-4 w-4 mr-2" />
                          Create New Article
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    articles.map((article, index) => (
                      <div key={article.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:scale-[1.01] animate-fade-in" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate hover:text-brand-blue-600 transition-colors duration-200">{article.title}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
                              article.status === 'published' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }`}>
                              {article.status}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(article.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="transform hover:scale-110 transition-all duration-200">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
                {articles.length > 0 && (
                  <div className="mt-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <Button variant="outline" className="w-full transform hover:scale-105 active:scale-95 transition-all duration-200">
                      View All Articles
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/generate" className="block animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <Button className="w-full justify-start btn-primary transform hover:scale-105 active:scale-95 transition-all duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Article
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start transform hover:scale-105 active:scale-95 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start transform hover:scale-105 active:scale-95 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '1s' }}>
              <CardHeader>
                <CardTitle>Writing Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-brand-blue-50 rounded-lg transform hover:scale-105 transition-all duration-200 hover:bg-brand-blue-100 animate-fade-in" style={{ animationDelay: '1.1s' }}>
                    <h4 className="font-medium text-brand-blue-900 mb-2">Hook Your Readers</h4>
                    <p className="text-sm text-brand-blue-700">
                      Start your articles with a compelling question or surprising statistic to grab attention from the first sentence.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
