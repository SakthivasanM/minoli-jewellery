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
          50: '#FBF9F4',
          100: '#F6F1E6',
          200: '#ECE0C9',
          300: '#DECB9D',
          400: '#D2B674',
          500: '#C6A15B', // Primary Champagne Gold
          600: '#B89556', // Highlight Muted Gold
          700: '#94753F',
          800: '#755B32',
          900: '#523E22',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FCFAF6',
          200: '#FAF7F0', // Secondary Warm Ivory
          300: '#F3EDE1',
          400: '#E9DFCF', // Accent Soft Beige
          500: '#DDD0BA',
        },
        charcoal: {
          50: '#F4F4F5',
          100: '#E4E4E7',
          200: '#A1A1AA',
          300: '#71717A',
          400: '#52525B',
          500: '#3F3F46',
          600: '#2F2F32',
          700: '#292929', // Text Deep Charcoal
          800: '#1F1F21',
          900: '#151516',
          950: '#0C0C0D',
        },
        gold: {
          DEFAULT: '#C6A15B',
          light: '#DECB9D',
          dark: '#B89556',
        }
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
