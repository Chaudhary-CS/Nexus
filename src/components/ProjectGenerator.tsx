'use client';

import React, { useState } from 'react';
import { projectAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Sparkles, MessageSquare, BarChart3, Route, Target, Brain, Zap } from 'lucide-react';

interface ProjectGeneratorProps {
  onAuthRequired: () => void;
}

export const ProjectGenerator: React.FC<ProjectGeneratorProps> = ({ onAuthRequired }) => {
  const [projectIdea, setProjectIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectIdea.trim()) {
      setError('Please enter a project idea');
      return;
    }

    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await projectAPI.generateRoadmap(projectIdea.trim());
      setResults(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate roadmap');
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
    return <ProjectResults results={results} onBack={() => setResults(null)} />;
  }

  return (
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

                {!isAuthenticated && (
                  <button
                    type="button"
                    onClick={onAuthRequired}
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
  );
};

// Project Results Component
const ProjectResults: React.FC<{ results: any; onBack: () => void }> = ({ results, onBack }) => {
  return (
    <div className="min-h-screen bg-surface-gradient pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-nexus-purple hover:text-nexus-blue transition-colors"
        >
          ← Back to Generator
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-elevated border border-border rounded-2xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-text-primary mb-6">
              Project Roadmap Generated!
            </h1>
            
            {/* Display results here */}
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-text-muted">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 