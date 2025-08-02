'use client';

import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      {/* Simple Header */}
      <header className="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-nexus border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-nexus-gradient bg-clip-text text-transparent">
                  Nexus
                </h1>
                <p className="text-xs text-text-muted leading-none">AI-Powered Planning</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <button className="px-4 py-2 text-sm rounded-xl bg-nexus-purple/10 text-nexus-purple border border-nexus-purple/20 hover:bg-nexus-purple/20 transition-all">
                Sign In
              </button>
              <button className="px-4 py-2 text-sm rounded-xl bg-nexus-gradient text-white hover:scale-105 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface-gradient">
          
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nexus-purple/10 rounded-full blur-3xl animate-float" />
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-nexus-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-purple/10 border border-nexus-purple/20 text-nexus-purple text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
              ✨ AI-Powered Project Intelligence
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
              <button className="px-8 py-4 text-xl rounded-xl bg-nexus-gradient text-white hover:scale-105 transition-all w-full sm:w-auto">
                Generate Your Roadmap →
              </button>
              <button className="px-8 py-4 text-xl rounded-xl border-2 border-nexus-purple text-nexus-purple hover:bg-nexus-purple hover:text-white transition-all w-full sm:w-auto">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 lg:py-32 bg-dark-bg relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-purple/10 border border-nexus-purple/20 text-nexus-purple text-sm font-medium mb-6 backdrop-blur-sm">
                ⚡ Powerful Features
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
              {[
                { title: "Interactive AI Chat", desc: "Continuously refine your project with natural conversations.", icon: "💬", color: "nexus-purple" },
                { title: "Sentiment Analysis", desc: "Understand user feedback and market sentiment.", icon: "📊", color: "nexus-blue" },
                { title: "Smart Roadmaps", desc: "Generate comprehensive project roadmaps with AI-powered suggestions.", icon: "🗺️", color: "nexus-green" },
                { title: "Market Analysis", desc: "Deep dive into your target market and competition.", icon: "🎯", color: "nexus-purple" },
                { title: "AI-Powered Insights", desc: "Get intelligent recommendations based on millions of data points.", icon: "🧠", color: "nexus-blue" },
                { title: "User Research", desc: "Understand your users before you build.", icon: "👥", color: "nexus-green" },
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className="rounded-2xl border bg-surface-elevated/80 border-border p-6 hover:scale-105 transition-all duration-500 cursor-pointer animate-fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-muted">{feature.desc}</p>
                  <div className="mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-nexus-purple">Learn more →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 