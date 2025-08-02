'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section className={cn(
      "relative min-h-screen flex items-center justify-center overflow-hidden bg-surface-gradient",
      className
    )}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nexus-purple/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-nexus-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-nexus-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(263, 70%, 50%) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-purple/10 border border-nexus-purple/20 text-nexus-purple text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          AI-Powered Project Intelligence
          <div className="w-2 h-2 bg-nexus-green rounded-full animate-pulse" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="block text-text-primary">
            Transform Your
          </span>
          <span className="block bg-nexus-gradient bg-clip-text text-transparent">
            Ideas Into Reality
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-text-muted max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Get a comprehensive roadmap, competitive analysis, and learning resources to turn your app idea into a successful digital product with AI-powered insights.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button variant="nexus" size="xl" className="w-full sm:w-auto group">
            Generate Your Roadmap
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="nexus-outline" size="xl" className="w-full sm:w-auto">
            Watch Demo
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <FeaturePill icon={<Target className="w-4 h-4" />} text="Market Analysis" />
          <FeaturePill icon={<Zap className="w-4 h-4" />} text="AI Insights" />
          <FeaturePill icon={<Sparkles className="w-4 h-4" />} text="Smart Roadmaps" />
        </div>
      </div>

      {/* Project Input Card */}
      <ProjectInputCard />
    </section>
  );
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-border/50 text-text-muted text-sm backdrop-blur-sm hover:border-nexus-purple/50 hover:text-nexus-purple transition-all duration-300">
      {icon}
      {text}
    </div>
  );
}

function ProjectInputCard() {
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <Card 
      variant="glass" 
      glow 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl animate-fade-in" 
      style={{ animationDelay: '1s' }}
    >
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            Describe Your Project Idea
          </h3>
          <p className="text-text-muted">
            Get a comprehensive strategic plan in seconds
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A food delivery app for college students with real-time tracking and group ordering features..."
              className={cn(
                "w-full min-h-[120px] p-4 rounded-xl resize-none",
                "bg-surface/80 border border-border/50 text-text-primary placeholder-text-muted",
                "focus:outline-none focus:ring-2 focus:ring-nexus-purple focus:border-transparent",
                "backdrop-blur-sm transition-all duration-300"
              )}
            />
            <div className="absolute bottom-3 right-3 text-xs text-text-muted">
              {prompt.length}/500
            </div>
          </div>

          <Button 
            variant="nexus" 
            size="lg" 
            className="w-full group"
            onClick={handleGenerate}
            isLoading={isGenerating}
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              "Generating Your Roadmap..."
            ) : (
              <>
                Generate Project Roadmap
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
} 