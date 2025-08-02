'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, User, LogOut, Mail, Lock, ArrowRight, MessageSquare, BarChart3, Route, Target, Brain, Zap } from 'lucide-react';

// API Functions
const API_BASE_URL = 'http://localhost:5000';

const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  async signup(userData: { email: string; password: string; name: string }) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async generateRoadmap(projectIdea: string) {
    return this.request('/generate', {
      method: 'POST',
      body: JSON.stringify({ project_idea: projectIdea }),
    });
  },
};

// Auth Modal Component
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (mode === 'login') {
        response = await api.login({ email: formData.email, password: formData.password });
      } else {
        response = await api.signup({ name: formData.name, email: formData.email, password: formData.password });
      }
      
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        onSuccess(response.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md mx-4 bg-surface-elevated rounded-2xl border border-border shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-nexus-gradient rounded-xl">
                <Sparkles className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-nexus-gradient bg-clip-text text-transparent">
                Nexus
              </h1>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-text-primary text-center mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join Nexus'}
          </h2>
          <p className="text-text-muted text-center text-sm mb-6">
            {mode === 'login' 
              ? 'Sign in to access your project roadmaps' 
              : 'Create your account to start building'
            }
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-text-muted" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-nexus-purple focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-text-muted" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-nexus-purple focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-text-muted" />
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-nexus-purple focus:border-transparent"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 px-4 bg-nexus-gradient text-white font-medium rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>

            <div className="mt-6 text-center">
              <p className="text-text-muted text-sm">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                {' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login');
                    setError('');
                    setFormData({ name: '', email: '', password: '' });
                  }}
                  className="text-nexus-purple hover:text-nexus-blue transition-colors font-medium"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [projectIdea, setProjectIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const openAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectIdea.trim()) {
      setError('Please enter a project idea');
      return;
    }

    if (!user) {
      openAuth('signup');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.generateRoadmap(projectIdea.trim());
      setResults(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate roadmap. Trying with demo data...');
      // Fallback to demo results if API fails
      setTimeout(() => {
        setResults({
          project_idea: projectIdea,
          roadmap: {
            phases: [
              { name: "Market Research & Validation", duration: "2-4 weeks", tasks: ["User interviews", "Competitor analysis", "Market size estimation"] },
              { name: "MVP Development", duration: "8-12 weeks", tasks: ["Core feature development", "Basic UI/UX", "Testing"] },
              { name: "Launch & Growth", duration: "Ongoing", tasks: ["Marketing", "User acquisition", "Feature expansion"] }
            ]
          },
          market_analysis: {
            opportunity_score: 85,
            competition_level: "Medium",
            target_market: "Digital consumers aged 25-45"
          },
          tech_stack: {
            frontend: "React/Next.js",
            backend: "Node.js/Express",
            database: "PostgreSQL",
            hosting: "Vercel/AWS"
          }
        });
        setError('');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: MessageSquare, title: "Interactive Chat", desc: "Refine with AI conversations" },
    { icon: BarChart3, title: "Market Analysis", desc: "Real-time competitor insights" },
    { icon: Route, title: "Smart Roadmaps", desc: "AI-powered project planning" },
    { icon: Target, title: "User Research", desc: "Understand your audience" },
    { icon: Brain, title: "AI Insights", desc: "Intelligent recommendations" },
    { icon: Zap, title: "Fast Results", desc: "Get answers in seconds" },
  ];

  if (results) {
    return (
      <div className="min-h-screen bg-dark-bg text-text-primary">
        <header className="fixed top-0 w-full z-40 bg-dark-bg/80 backdrop-blur-nexus border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-nexus-gradient rounded-xl">
                  <Sparkles className="text-white" size={20} />
                </div>
                <h1 className="text-xl lg:text-2xl font-bold bg-nexus-gradient bg-clip-text text-transparent">
                  Nexus
                </h1>
              </div>
              <button
                onClick={() => setResults(null)}
                className="text-nexus-purple hover:text-nexus-blue transition-colors"
              >
                ← Back to Generator
              </button>
            </div>
          </div>
        </header>

        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-surface-elevated border border-border rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-text-primary mb-6">
                  🎉 Project Roadmap Generated!
                </h1>
                
                <div className="space-y-8">
                  {/* Project Overview */}
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-3">Project Idea</h2>
                    <p className="text-text-muted bg-surface p-4 rounded-xl">{results.project_idea}</p>
                  </div>

                  {/* Roadmap */}
                  {results.roadmap && (
                    <div>
                      <h2 className="text-2xl font-semibold text-text-primary mb-4">Development Roadmap</h2>
                      <div className="grid gap-4">
                        {results.roadmap.phases?.map((phase: any, index: number) => (
                          <div key={index} className="bg-surface p-6 rounded-xl border border-border">
                            <h3 className="text-lg font-semibold text-nexus-purple mb-2">{phase.name}</h3>
                            <p className="text-text-muted mb-3">Duration: {phase.duration}</p>
                            <ul className="list-disc list-inside text-text-muted space-y-1">
                              {phase.tasks?.map((task: string, taskIndex: number) => (
                                <li key={taskIndex}>{task}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Market Analysis */}
                  {results.market_analysis && (
                    <div>
                      <h2 className="text-2xl font-semibold text-text-primary mb-4">Market Analysis</h2>
                      <div className="bg-surface p-6 rounded-xl border border-border">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold text-nexus-purple">Opportunity Score</h4>
                            <p className="text-2xl font-bold text-text-primary">{results.market_analysis.opportunity_score}/100</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-nexus-purple">Competition</h4>
                            <p className="text-text-muted">{results.market_analysis.competition_level}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-nexus-purple">Target Market</h4>
                            <p className="text-text-muted">{results.market_analysis.target_market}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {results.tech_stack && (
                    <div>
                      <h2 className="text-2xl font-semibold text-text-primary mb-4">Recommended Tech Stack</h2>
                      <div className="bg-surface p-6 rounded-xl border border-border">
                        <div className="grid md:grid-cols-2 gap-4">
                          {Object.entries(results.tech_stack).map(([key, value]) => (
                            <div key={key}>
                              <h4 className="font-semibold text-nexus-purple capitalize">{key}</h4>
                              <p className="text-text-muted">{value as string}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chat Coming Soon */}
                  <div className="bg-nexus-purple/10 border border-nexus-purple/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-nexus-purple mb-2">💬 Interactive Chat (Coming Soon)</h3>
                    <p className="text-text-muted">
                      Soon you'll be able to chat with AI to refine your roadmap, ask questions about implementation, 
                      and get personalized advice for your project!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-dark-bg/80 backdrop-blur-nexus border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-nexus-gradient rounded-xl">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl lg:text-2xl font-bold bg-nexus-gradient bg-clip-text text-transparent">
                    Nexus
                  </h1>
                  <p className="text-xs text-text-muted leading-none hidden sm:block">AI-Powered Planning</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex space-x-6">
                <a href="#features" className="text-text-muted hover:text-text-primary transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-text-muted hover:text-text-primary transition-colors">
                  Pricing
                </a>
                <a href="#about" className="text-text-muted hover:text-text-primary transition-colors">
                  About
                </a>
              </nav>
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-surface-elevated rounded-xl border border-border">
                    <User size={16} className="text-nexus-purple" />
                    <span className="text-sm text-text-primary">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl text-text-muted hover:text-text-primary transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => openAuth('login')}
                    className="px-4 py-2 text-sm rounded-xl bg-nexus-purple/10 text-nexus-purple border border-nexus-purple/20 hover:bg-nexus-purple/20 transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuth('signup')}
                    className="px-4 py-2 text-sm rounded-xl bg-nexus-gradient text-white hover:scale-105 transition-all"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border/50">
              <div className="flex flex-col space-y-4">
                <nav className="flex flex-col space-y-3">
                  <a href="#features" className="text-text-muted hover:text-text-primary transition-colors">
                    Features
                  </a>
                  <a href="#pricing" className="text-text-muted hover:text-text-primary transition-colors">
                    Pricing
                  </a>
                  <a href="#about" className="text-text-muted hover:text-text-primary transition-colors">
                    About
                  </a>
                </nav>
                
                {user ? (
                  <div className="flex flex-col space-y-3 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2 px-3 py-2 bg-surface-elevated rounded-xl border border-border">
                      <User size={16} className="text-nexus-purple" />
                      <span className="text-sm text-text-primary">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl text-text-muted hover:text-text-primary transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 pt-3 border-t border-border/50">
                    <button
                      onClick={() => {
                        openAuth('login');
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 text-sm rounded-xl bg-nexus-purple/10 text-nexus-purple border border-nexus-purple/20 hover:bg-nexus-purple/20 transition-all"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        openAuth('signup');
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 text-sm rounded-xl bg-nexus-gradient text-white hover:scale-105 transition-all"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="min-h-screen bg-surface-gradient pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-purple/10 border border-nexus-purple/20 text-nexus-purple text-sm font-medium mb-8 backdrop-blur-sm">
                <Sparkles size={16} />
                AI-Powered Project Intelligence
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-none mb-6">
                <span className="block text-text-primary">Transform Your</span>
                <span className="block bg-nexus-gradient bg-clip-text text-transparent">Ideas Into Reality</span>
              </h1>

              <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
                Get a comprehensive roadmap, competitive analysis, and learning resources to turn your app idea into a successful digital product with AI-powered insights.
              </p>
            </div>

            {/* Project Input Form */}
            <div className="max-w-2xl mx-auto mb-16">
              <form onSubmit={handleSubmit} className="relative">
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="relative bg-surface-elevated border border-border rounded-2xl p-6 shadow-xl">
                  <label htmlFor="projectIdea" className="block text-sm font-medium text-text-primary mb-3">
                    Describe Your App or Project Idea
                  </label>
                  
                  <textarea
                    id="projectIdea"
                    value={projectIdea}
                    onChange={(e) => setProjectIdea(e.target.value)}
                    placeholder="e.g., A food delivery app that connects local restaurants with customers, focusing on healthy meal options and quick delivery..."
                    className="w-full h-32 px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-nexus-purple focus:border-transparent"
                    required
                  />

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                      type="submit"
                      disabled={loading || !projectIdea.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-nexus-gradient text-white font-medium rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate Roadmap
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                    {!user && (
                      <button
                        type="button"
                        onClick={() => openAuth('signup')}
                        className="px-6 py-3 border-2 border-nexus-purple text-nexus-purple rounded-xl hover:bg-nexus-purple hover:text-white transition-all"
                      >
                        Sign In to Save
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Features Grid */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                  Everything You Need to{' '}
                  <span className="bg-nexus-gradient bg-clip-text text-transparent">
                    Build Successfully
                  </span>
                </h2>
                <p className="text-lg text-text-muted">
                  Nexus combines human intuition with AI intelligence to give you the complete picture
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div 
                      key={feature.title}
                      className="bg-surface-elevated/80 border border-border rounded-2xl p-6 hover:scale-105 transition-all duration-500 cursor-pointer group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="mb-4">
                        <Icon className="w-8 h-8 text-nexus-purple" />
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary mb-2">{feature.title}</h3>
                      <p className="text-text-muted">{feature.desc}</p>
                      <div className="mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-nexus-purple">Learn more →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={(user) => setUser(user)}
      />
    </div>
  );
} 