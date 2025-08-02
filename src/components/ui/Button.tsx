import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'nexus' | 'nexus-outline' | 'nexus-ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'nexus', size = 'md', children, isLoading, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 rounded-xl font-semibold
      transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
      focus:outline-none focus:ring-2 focus:ring-nexus-purple focus:ring-offset-2 
      focus:ring-offset-dark-bg disabled:opacity-50 disabled:pointer-events-none
      relative overflow-hidden group
    `;

    const variants = {
      nexus: `
        bg-nexus-gradient text-white shadow-lg
        hover:shadow-xl hover:shadow-nexus-purple/25 hover:scale-105
        before:absolute before:inset-0 before:bg-white/10 before:opacity-0 
        before:transition-opacity hover:before:opacity-100
        animate-glow
      `,
      'nexus-outline': `
        border-2 border-nexus-purple text-nexus-purple bg-transparent
        hover:bg-nexus-purple hover:text-white hover:shadow-lg 
        hover:shadow-nexus-purple/25 hover:scale-105
        backdrop-blur-sm
      `,
      'nexus-ghost': `
        text-nexus-purple bg-nexus-purple/10 backdrop-blur-sm
        hover:bg-nexus-purple/20 hover:text-white hover:scale-105
        border border-nexus-purple/20 hover:border-nexus-purple/40
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm h-8',
      md: 'px-4 py-2 text-base h-10',
      lg: 'px-6 py-3 text-lg h-12',
      xl: 'px-8 py-4 text-xl h-14',
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        <span className="relative z-10">{children}</span>
        
        {/* Glow effect overlay */}
        <div className="absolute inset-0 bg-glow-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, type ButtonProps }; 