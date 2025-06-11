
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus, BarChart3, Clock, Users, TrendingUp, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  });

  const stats = [
    { title: "Articles Created", value: "24", icon: <FileText className="h-5 w-5" />, change: "+12%" },
    { title: "Total Views", value: "15.2K", icon: <BarChart3 className="h-5 w-5" />, change: "+8%" },
    { title: "Avg. Read Time", value: "3.2 min", icon: <Clock className="h-5 w-5" />, change: "+5%" },
    { title: "Engagement Rate", value: "68%", icon: <TrendingUp className="h-5 w-5" />, change: "+15%" },
  ];

  const recentArticles = [
    {
      id: 1,
      title: "10 Tips for Better Content Marketing",
      status: "Published",
      views: "1.2K",
      date: "2 days ago",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "The Future of AI in Digital Marketing",
      status: "Draft",
      views: "-",
      date: "5 days ago",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "SEO Best Practices for 2024",
      status: "Published",
      views: "856",
      date: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 rounded-lg flex items-center justify-center">
                <Edit className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ArticleGen</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/generate" className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Link>
              <div className="flex items-center space-x-2">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your content today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className="text-brand-blue-600 bg-brand-blue-50 p-3 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Articles */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Articles</CardTitle>
                <CardDescription>Your latest content and drafts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <img 
                        src={article.thumbnail} 
                        alt={article.title}
                        className="w-16 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{article.title}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            article.status === 'Published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.status}
                          </span>
                          <span className="text-sm text-gray-500">{article.views} views</span>
                          <span className="text-sm text-gray-500">{article.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    View All Articles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/generate" className="block">
                  <Button className="w-full justify-start btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Article
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Writing Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-brand-blue-50 rounded-lg">
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
