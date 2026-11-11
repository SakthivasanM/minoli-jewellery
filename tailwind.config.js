/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#FAF6F0',
          100: '#F5ECE1',
          200: '#EAD7C3',
          300: '#D8B896',
          400: '#C69D6E',
          500: '#B88746', // Burnished Antique Gold from MINOLI Logo
          600: '#A16F3B',
          700: '#87582B',
          800: '#6B431D',
          900: '#4D2E12',
        },
        velvet: {
          50: '#FDF5F6',
          100: '#F9E6E9',
          200: '#F0C4CB',
          300: '#E093A0',
          400: '#C6576C',
          500: '#962840',
          600: '#7A1A2F',
          700: '#601222', // Royal Velvet Wine
          800: '#4A0B18', // Signature Box Interior Bordeaux
          900: '#33060E',
          950: '#1F0308',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FAF7F2', // Soft Cashmere Cream from Brand Packaging
          200: '#F4EFE6', // Silk Drape Nude
          300: '#EAE2D5',
          400: '#DFD3C1',
          500: '#CEBEA6',
        },
        charcoal: {
          50: '#F7F6F5',
          100: '#EAE8E6',
          200: '#AFA9A6',
          300: '#7A7371',
          400: '#5A5351',
          500: '#423B3A',
          600: '#322B2A',
          700: '#262021', // Warm Espresso Charcoal
          800: '#1E1819',
          900: '#161213',
          950: '#0E0B0C',
        },
        gold: {
          DEFAULT: '#B88746',
          light: '#D8B896',
          dark: '#A16F3B',
        }
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/4': '3 / 4',
        '16/10': '16 / 10',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(41, 41, 41, 0.05)',
        'luxury': '0 10px 30px -5px rgba(198, 161, 91, 0.12)',
        'luxury-hover': '0 20px 40px -10px rgba(198, 161, 91, 0.22)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
};
