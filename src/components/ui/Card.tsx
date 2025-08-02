import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  glow?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', glow = false, children, ...props }, ref) => {
    const baseStyles = `
      rounded-2xl border transition-all duration-300 
      backdrop-blur-nexus relative overflow-hidden group
    `;

    const variants = {
      default: `
        bg-surface/80 border-border
        hover:bg-surface-elevated/80 hover:border-nexus-purple/30
      `,
      elevated: `
        bg-surface-elevated/80 border-border
        shadow-lg hover:shadow-xl hover:shadow-nexus-purple/10
        hover:bg-surface-elevated hover:border-nexus-purple/30
      `,
      glass: `
        bg-surface/40 border-border/50 backdrop-blur-xl
        hover:bg-surface/60 hover:border-nexus-purple/30
        shadow-2xl
      `,
    };

    const glowStyles = glow
      ? `before:absolute before:inset-0 before:bg-glow-gradient before:opacity-0 
         before:transition-opacity before:duration-500 hover:before:opacity-100`
      : '';

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          glowStyles,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-nexus-purple/5 via-transparent to-nexus-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    );
  }
);

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight text-text-primary', className)}
      {...props}
    />
  )
);

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-muted', className)}
      {...props}
    />
  )
);

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
}; 