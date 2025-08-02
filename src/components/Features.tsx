'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  BarChart3, 
  Route, 
  Sparkles, 
  Users, 
  Zap,
  Target,
  Brain,
  Rocket
} from 'lucide-react';

interface FeaturesProps {
  className?: string;
}

export function Features({ className }: FeaturesProps) {
  return (
    <section className={cn(
      "py-24 lg:py-32 bg-dark-bg relative overflow-hidden",
      className
    )}>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-nexus-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-purple/10 border border-nexus-purple/20 text-nexus-purple text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Everything You Need to{' '}
            <span className="bg-nexus-gradient bg-clip-text text-transparent">
              Build Successfully
            </span>
          </h2>
          
          <p className="text-lg text-text-muted leading-relaxed">
            Nexus combines human intuition with AI intelligence to give you the complete picture 
            of your project before you start building.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text-muted mb-4">
            Ready to transform your idea into reality?
          </p>
          <div className="inline-flex items-center gap-2 text-nexus-purple font-medium group cursor-pointer">
            Get started for free
            <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  color: 'purple' | 'blue' | 'green';
}

const features: Feature[] = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Interactive AI Chat",
    description: "Continuously refine your project with natural conversations.",
    details: "Ask questions, get insights, and iterate on your roadmap in real-time.",
    color: 'purple'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Sentiment Analysis",
    description: "Understand user feedback and market sentiment.",
    details: "Get insights on what users love and what needs improvement in similar apps.",
    color: 'blue'
  },
  {
    icon: <Route className="w-6 h-6" />,
    title: "Smart Roadmaps",
    description: "Generate comprehensive project roadmaps with AI-powered suggestions.",
    details: "Timelines, milestones, and milestone recommendations tailored to your project.",
    color: 'green'
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Market Analysis",
    description: "Deep dive into your target market and competition.",
    details: "Comprehensive competitive landscape and opportunity identification.",
    color: 'purple'
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations based on millions of data points.",
    details: "Machine learning algorithms analyze patterns to guide your decisions.",
    color: 'blue'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "User Research",
    description: "Understand your users before you build.",
    details: "Real user feedback, pain points, and feature requests from social platforms.",
    color: 'green'
  }
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const colorStyles = {
    purple: {
      icon: 'text-nexus-purple bg-nexus-purple/10 border-nexus-purple/20',
      glow: 'group-hover:shadow-nexus-purple/20'
    },
    blue: {
      icon: 'text-nexus-blue bg-nexus-blue/10 border-nexus-blue/20',
      glow: 'group-hover:shadow-nexus-blue/20'
    },
    green: {
      icon: 'text-nexus-green bg-nexus-green/10 border-nexus-green/20',
      glow: 'group-hover:shadow-nexus-green/20'
    }
  };

  return (
    <Card 
      variant="elevated" 
      className={cn(
        "group hover:scale-105 transition-all duration-500 cursor-pointer",
        "animate-fade-in",
        colorStyles[feature.color].glow
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4 border transition-all duration-300",
          colorStyles[feature.color].icon,
          "group-hover:scale-110"
        )}>
          {feature.icon}
        </div>
        <CardTitle className="text-xl">{feature.title}</CardTitle>
        <CardDescription className="text-base">{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-muted leading-relaxed">
          {feature.details}
        </p>
        
        {/* Hover Arrow */}
        <div className="flex items-center gap-2 mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className={cn(
            feature.color === 'purple' && 'text-nexus-purple',
            feature.color === 'blue' && 'text-nexus-blue',
            feature.color === 'green' && 'text-nexus-green'
          )}>
            Learn more
          </span>
          <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
} 