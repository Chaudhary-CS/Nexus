'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-nexus border-b border-border/50",
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-nexus-gradient rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-dark-bg/90 backdrop-blur-sm rounded-lg p-2 border border-nexus-purple/20">
                <Sparkles className="h-6 w-6 text-nexus-purple animate-pulse" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-nexus-gradient bg-clip-text text-transparent">
                Nexus
              </h1>
              <p className="text-xs text-text-muted leading-none">AI-Powered Planning</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#docs">Docs</NavLink>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="nexus-ghost" size="sm">
              Sign In
            </Button>
            <Button variant="nexus" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-surface/50 backdrop-blur-sm border border-border text-text-primary hover:text-nexus-purple transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden animate-fade-in">
          <div className="bg-surface/95 backdrop-blur-xl border-t border-border/50 px-4 pt-4 pb-6 space-y-4">
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#pricing">Pricing</MobileNavLink>
            <MobileNavLink href="#about">About</MobileNavLink>
            <MobileNavLink href="#docs">Docs</MobileNavLink>
            
            <div className="pt-4 space-y-3">
              <Button variant="nexus-ghost" size="md" className="w-full">
                Sign In
              </Button>
              <Button variant="nexus" size="md" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-text-muted hover:text-text-primary transition-colors duration-300 font-medium relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nexus-gradient group-hover:w-full transition-all duration-300"></span>
    </a>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block text-text-muted hover:text-text-primary transition-colors duration-300 font-medium py-2"
    >
      {children}
    </a>
  );
} 