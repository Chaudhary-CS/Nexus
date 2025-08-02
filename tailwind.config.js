/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nexus Brand Colors (HSL)
        'nexus-purple': 'hsl(263, 70%, 50%)',
        'nexus-blue': 'hsl(217, 91%, 60%)', 
        'nexus-green': 'hsl(152, 76%, 50%)',
        
        // Background System
        'dark-bg': 'hsl(240, 10%, 3.9%)',
        'surface': 'hsl(240, 6%, 10%)',
        'surface-elevated': 'hsl(240, 5%, 15%)',
        
        // Text System
        'text-primary': 'hsl(0, 0%, 98%)',
        'text-muted': 'hsl(240, 5%, 64.9%)',
        
        // Semantic Colors
        border: 'hsl(240, 5%, 20%)',
        ring: 'hsl(263, 70%, 50%)',
      },
      
      backgroundImage: {
        'nexus-gradient': 'linear-gradient(135deg, hsl(263, 70%, 50%), hsl(217, 91%, 60%))',
        'surface-gradient': 'linear-gradient(180deg, hsl(240, 10%, 3.9%), hsl(240, 6%, 10%))',
        'glow-gradient': 'radial-gradient(circle, hsla(263, 70%, 50%, 0.3), transparent 70%)',
      },
      
      backdropBlur: {
        'nexus': '20px',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px)' 
          },
          '50%': { 
            transform: 'translateY(-20px)' 
          },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px hsla(263, 70%, 50%, 0.3)' 
          },
          '100%': { 
            boxShadow: '0 0 30px hsla(263, 70%, 50%, 0.6)' 
          },
        },
        scaleIn: {
          '0%': { 
            transform: 'scale(0.9)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 