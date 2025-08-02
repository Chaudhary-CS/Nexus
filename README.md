# Nexus Design System

A modern, dark-themed React + TypeScript + Tailwind CSS design system for AI-powered project planning platform.

## 🎨 Design Tokens

### Color Palette (HSL)
```css
/* Brand Colors */
--nexus-purple: hsl(263, 70%, 50%)   /* Main brand color */
--nexus-blue: hsl(217, 91%, 60%)     /* Accent blue */
--nexus-green: hsl(152, 76%, 50%)    /* Success/highlights */

/* Background System */
--dark-bg: hsl(240, 10%, 3.9%)       /* Main background */
--surface: hsl(240, 6%, 10%)         /* Card backgrounds */
--surface-elevated: hsl(240, 5%, 15%) /* Elevated cards */

/* Text System */
--text-primary: hsl(0, 0%, 98%)      /* Primary text */
--text-muted: hsl(240, 5%, 64.9%)    /* Secondary text */
```

### Gradients
- **Primary Gradient**: `linear-gradient(135deg, purple → blue)`
- **Surface Gradient**: `linear-gradient(180deg, dark bg → surface)`
- **Glow Effect**: `radial-gradient(circle, purple transparency)`

## 🧩 Components

### Button Variants
```tsx
<Button variant="nexus">Primary Action</Button>
<Button variant="nexus-outline">Secondary Action</Button>
<Button variant="nexus-ghost">Subtle Action</Button>
```

### Card Variants
```tsx
<Card variant="default">Standard card</Card>
<Card variant="elevated">Elevated with shadow</Card>
<Card variant="glass" glow>Glassmorphism with glow</Card>
```

## 🎭 Animations

### Keyframes
- **fade-in**: translateY + opacity transition
- **float**: Gentle Y-axis oscillation
- **glow**: Pulsing shadow effect
- **scale-in**: Scale + opacity entrance

### Usage
```tsx
<div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
  Content appears with stagger
</div>
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── ui/
│   │   ├── Button.tsx     # Button component
│   │   └── Card.tsx       # Card components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   └── Features.tsx       # Features grid
└── lib/
    └── utils.ts           # Utility functions
```

## 🚀 Getting Started

### Installation
```bash
npm install react react-dom next typescript tailwindcss
npm install autoprefixer postcss clsx tailwind-merge
npm install lucide-react framer-motion
npm install @tailwindcss/forms @tailwindcss/typography
```

### Development
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## 🎯 Key Features

### Glassmorphism Effects
- Backdrop blur on cards and overlays
- Subtle transparency layers
- Smooth hover transitions

### Responsive Design
- Mobile-first approach
- Container max-widths
- Flexible grid systems

### Dark Theme Optimized
- High contrast ratios
- Subtle glow effects
- Premium visual hierarchy

### Performance
- Optimized animations
- Lazy loading ready
- Tree-shakeable components

## 🎨 Design Principles

### Visual Hierarchy
- Large, bold headings (4xl-8xl)
- Gradient text on key phrases
- Consistent spacing system

### Interaction Design
- Hover scale transforms
- Glow effects on focus states
- Smooth cubic-bezier transitions

### Accessibility
- High contrast colors
- Focus ring indicators
- Semantic HTML structure

## 🔧 Customization

### Extending Colors
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'custom-purple': 'hsl(280, 70%, 50%)',
    }
  }
}
```

### Custom Animations
```js
// tailwind.config.js
animation: {
  'custom-bounce': 'bounce 1s infinite',
}
```

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

## 🎪 Component Examples

### Hero Section
- Animated background elements
- Gradient text effects
- Interactive project input card
- Floating animation elements

### Features Grid
- 3-column responsive layout
- Staggered entrance animations
- Hover scale effects
- Color-coded feature categories

### Header
- Sticky navigation
- Glassmorphism background
- Mobile menu with backdrop blur
- Animated logo with glow effects

## 🌟 Best Practices

1. **Use semantic HTML** for accessibility
2. **Implement proper focus states** for keyboard navigation
3. **Optimize animations** for reduced motion preferences
4. **Test dark theme** across all components
5. **Maintain consistent spacing** using Tailwind's scale

## 📄 License

This design system is part of the Nexus project. All rights reserved. 