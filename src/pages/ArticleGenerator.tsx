
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles, Edit, Share2, CheckCircle, Save, Eye } from "lucide-react";
import { Link } from "react-router-dom";

type Step = 1 | 2 | 3 | 4;

interface OutlineData {
  title: string;
  instructions: string;
  audience: string;
  length: string;
  industry: string;
  contentType: string;
}

interface ArticleData extends OutlineData {
  tone: string;
  keywords: string[];
  citations: boolean;
  additionalInstructions: string;
}

interface FinalArticle extends ArticleData {
  content: string;
  metaDescription: string;
  tags: string[];
  featuredImage: string;
}

const ArticleGenerator = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  
  const [outlineData, setOutlineData] = useState<OutlineData>({
    title: '',
    instructions: '',
    audience: '',
    length: '',
    industry: '',
    contentType: ''
  });

  const [articleData, setArticleData] = useState<ArticleData>({
    ...outlineData,
    tone: '',
    keywords: [],
    citations: false,
    additionalInstructions: ''
  });

  const [finalArticle, setFinalArticle] = useState<FinalArticle>({
    ...articleData,
    content: '',
    metaDescription: '',
    tags: [],
    featuredImage: ''
  });

  const progress = (currentStep / 4) * 100;

  const handleOutlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI outline generation
    setTimeout(() => {
      const mockOutline = `
# ${outlineData.title}

## Introduction
- Hook: Start with an engaging question or statistic
- Brief overview of the topic
- Preview of what readers will learn

## Main Section 1: Understanding the Basics
- Definition and key concepts
- Why this matters to your audience
- Common misconceptions

## Main Section 2: Practical Applications
- Step-by-step guidance
- Real-world examples
- Best practices to follow

## Main Section 3: Advanced Strategies
- Expert tips and insights
- Tools and resources
- Future trends and considerations

## Conclusion
- Recap of key points
- Call to action
- Next steps for readers

## Additional Elements
- FAQ section
- Related resources
- Author bio and credentials
      `;
      
      setGeneratedOutline(mockOutline);
      setIsLoading(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI article generation
    setTimeout(() => {
      const mockContent = `
# ${articleData.title}

*In today's digital landscape, creating compelling content has become more crucial than ever. Whether you're a seasoned marketer or just starting your content journey, understanding the fundamentals can make the difference between content that converts and content that gets ignored.*

## Understanding the Basics

Content creation isn't just about putting words on a page—it's about crafting experiences that resonate with your audience. When we talk about effective content, we're discussing material that not only informs but also engages, entertains, and ultimately drives action.

### Why This Matters

In an era where attention spans are shrinking and competition for eyeballs is fierce, your content needs to work harder than ever. Quality content serves multiple purposes:

- **Builds trust and authority** in your industry
- **Drives organic traffic** through search engines
- **Generates leads and conversions**
- **Establishes thought leadership**

## Practical Applications

Let's dive into the actionable strategies you can implement immediately:

### 1. Know Your Audience Inside and Out

Before you write a single word, you need to understand who you're writing for. Create detailed buyer personas that include:

- Demographics and psychographics
- Pain points and challenges
- Preferred communication styles
- Content consumption habits

### 2. Create Compelling Headlines

Your headline is often the first—and sometimes only—chance to capture attention. Effective headlines:

- Promise a clear benefit
- Create curiosity or urgency
- Include relevant keywords
- Are specific and actionable

### 3. Structure for Readability

Modern readers scan before they read. Make your content scannable with:

- **Short paragraphs** (2-3 sentences max)
- **Bullet points and numbered lists**
- **Subheadings** that break up sections
- **Bold text** for emphasis

## Advanced Strategies

Once you've mastered the basics, these advanced techniques will set your content apart:

### Storytelling Integration

Every piece of content should tell a story, even if it's instructional. Stories create emotional connections and make information more memorable. Consider:

- Case studies that illustrate your points
- Personal anecdotes that build relatability
- Customer success stories that provide social proof

### Data-Driven Optimization

Use analytics to inform your content strategy:

- Track engagement metrics to understand what resonates
- A/B test different headlines and formats
- Monitor search rankings and adjust accordingly
- Analyze competitor content for gaps and opportunities

## Conclusion

Creating exceptional content is both an art and a science. By understanding your audience, crafting compelling narratives, and continuously optimizing based on data, you'll be well on your way to content marketing success.

Remember, great content isn't created overnight—it's the result of consistent effort, strategic thinking, and a genuine desire to provide value to your audience.

**Ready to elevate your content game?** Start by implementing one strategy from this guide today, and build from there.

---

*What's your biggest content creation challenge? Share your thoughts and let's discuss strategies that work.*
      `;
      
      setGeneratedContent(mockContent);
      setFinalArticle(prev => ({ 
        ...prev, 
        content: mockContent,
        metaDescription: `Learn essential ${articleData.industry} strategies that drive results. Discover practical tips, advanced techniques, and expert insights.`
      }));
      setIsLoading(false);
      setCurrentStep(3);
    }, 3000);
  };

  const handlePublish = async () => {
    setIsLoading(true);
    
    // Simulate publishing
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4);
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-blue-600" />
                  Generate Article Outline
                </CardTitle>
                <CardDescription>
                  Tell us about your article and we'll create a comprehensive outline for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOutlineSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Article Title *</Label>
                    <Input
                      id="title"
                      value={outlineData.title}
                      onChange={(e) => setOutlineData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., 10 Proven Strategies for Content Marketing Success"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="instructions">Article Instructions *</Label>
                    <Textarea
                      id="instructions"
                      value={outlineData.instructions}
                      onChange={(e) => setOutlineData(prev => ({ ...prev, instructions: e.target.value }))}
                      placeholder="Describe what you want the article to cover, key points to include, and any specific requirements..."
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select onValueChange={(value) => setOutlineData(prev => ({ ...prev, audience: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Public</SelectItem>
                          <SelectItem value="professional">Business Professionals</SelectItem>
                          <SelectItem value="academic">Academic/Research</SelectItem>
                          <SelectItem value="casual">Casual Readers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="length">Article Length</Label>
                      <Select onValueChange={(value) => setOutlineData(prev => ({ ...prev, length: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short (500-800 words)</SelectItem>
                          <SelectItem value="medium">Medium (800-1500 words)</SelectItem>
                          <SelectItem value="long">Long (1500+ words)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry/Niche</Label>
                      <Input
                        id="industry"
                        value={outlineData.industry}
                        onChange={(e) => setOutlineData(prev => ({ ...prev, industry: e.target.value }))}
                        placeholder="e.g., Digital Marketing, Healthcare, Finance"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contentType">Content Type</Label>
                      <Select onValueChange={(value) => setOutlineData(prev => ({ ...prev, contentType: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="how-to">How-to Guide</SelectItem>
                          <SelectItem value="listicle">Listicle</SelectItem>
                          <SelectItem value="opinion">Opinion Piece</SelectItem>
                          <SelectItem value="news">News Article</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                          <SelectItem value="tutorial">Tutorial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full btn-primary">
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating Outline...
                      </div>
                    ) : (
                      'Generate Outline'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5 text-brand-blue-600" />
                  Generate Full Article
                </CardTitle>
                <CardDescription>
                  Review your outline and provide additional details for article generation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleArticleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="generated-outline">Generated Outline</Label>
                    <Textarea
                      id="generated-outline"
                      value={generatedOutline}
                      onChange={(e) => setGeneratedOutline(e.target.value)}
                      className="mt-1 min-h-[200px] font-mono text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tone">Tone of Voice</Label>
                      <Select onValueChange={(value) => setArticleData(prev => ({ ...prev, tone: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="authoritative">Authoritative</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="citations">Include Citations</Label>
                      <Select onValueChange={(value) => setArticleData(prev => ({ ...prev, citations: value === 'yes' }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Include sources?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, include citations</SelectItem>
                          <SelectItem value="no">No citations needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalInstructions">Additional Instructions (Optional)</Label>
                    <Textarea
                      id="additionalInstructions"
                      value={articleData.additionalInstructions}
                      onChange={(e) => setArticleData(prev => ({ ...prev, additionalInstructions: e.target.value }))}
                      placeholder="Any specific requirements, style preferences, or additional context..."
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full btn-primary">
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating Article...
                      </div>
                    ) : (
                      'Generate Article'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5 text-brand-blue-600" />
                  Edit & Publish Article
                </CardTitle>
                <CardDescription>
                  Review, edit, and prepare your article for publishing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="final-title">Article Title</Label>
                  <Input
                    id="final-title"
                    value={finalArticle.title || outlineData.title}
                    onChange={(e) => setFinalArticle(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="meta-description">SEO Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    value={finalArticle.metaDescription}
                    onChange={(e) => setFinalArticle(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="A compelling description for search engines (150-160 characters)"
                    className="mt-1"
                    maxLength={160}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {finalArticle.metaDescription.length}/160 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="article-content">Article Content</Label>
                  <Textarea
                    id="article-content"
                    value={finalArticle.content || generatedContent}
                    onChange={(e) => setFinalArticle(prev => ({ ...prev, content: e.target.value }))}
                    className="mt-1 min-h-[400px] font-mono text-sm"
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button onClick={handlePublish} disabled={isLoading} className="flex-1 btn-primary">
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Publishing...
                      </div>
                    ) : (
                      'Publish Article'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="form-step text-center">
            <Card>
              <CardContent className="p-12">
                <div className="animate-scale-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Published Successfully!</h2>
                  <p className="text-gray-600 mb-8">
                    Your article has been published and is now live. Share it with your audience!
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <Label className="text-sm font-medium text-gray-700">Article Link</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input 
                        value="https://articlegen.com/articles/your-article-slug"
                        readOnly
                        className="bg-white"
                      />
                      <Button variant="outline" size="sm">Copy</Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button className="btn-primary">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Article
                    </Button>
                    <Link to="/dashboard">
                      <Button variant="outline">View Dashboard</Button>
                    </Link>
                    <Link to="/generate">
                      <Button variant="outline">Create Another</Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="bg-brand-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-brand-blue-900 mb-2">Share on Social</h4>
                      <p className="text-sm text-brand-blue-700">
                        Boost your reach by sharing on Twitter, LinkedIn, and Facebook.
                      </p>
                    </div>
                    <div className="bg-brand-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-brand-purple-900 mb-2">Track Performance</h4>
                      <p className="text-sm text-brand-purple-700">
                        Monitor views, engagement, and reader feedback in your dashboard.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">SEO Optimization</h4>
                      <p className="text-sm text-green-700">
                        Your article is optimized for search engines with proper meta tags.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 rounded-lg flex items-center justify-center">
                <Edit className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ArticleGen</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Article</h1>
            {currentStep > 1 && currentStep < 4 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1) as Step)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span className={currentStep >= 1 ? 'text-brand-blue-600 font-medium' : ''}>
              1. Generate Outline
            </span>
            <span className={currentStep >= 2 ? 'text-brand-blue-600 font-medium' : ''}>
              2. Create Article
            </span>
            <span className={currentStep >= 3 ? 'text-brand-blue-600 font-medium' : ''}>
              3. Edit & Publish
            </span>
            <span className={currentStep >= 4 ? 'text-brand-blue-600 font-medium' : ''}>
              4. Success
            </span>
          </div>
        </div>

        {/* Step Content */}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ArticleGenerator;
