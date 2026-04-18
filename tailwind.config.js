/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Official Clinicist brandbook colors
          blue:     '#00AEEF',   // Primary Cyan
          'blue-d': '#0097CC',   // Hover Cyan (darker)
          'blue-l': '#6BC6ED',   // Light Cyan
          teal:     '#6BC6ED',   // Same as blue-l for compat
          'teal-d': '#0097CC',
          orange:   '#F47920',   // Orange dark accent
          'orange-d':'#D4650A',  // Darker orange
          'orange-l':'#FFA500',  // Orange light
          dark:     '#1A2B3A',
          gray:     '#64748B',
          light:    '#E0F5FD',   // Pale cyan background
          white:    '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'count-up':  'countUp 2s ease-out forwards',
        'float':     'float 6s ease-in-out infinite',
        'pulse-slow':'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp:  { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        card:   '0 4px 24px rgba(16, 84, 160, 0.08)',
        'card-hover': '0 12px 40px rgba(16, 84, 160, 0.16)',
        glow:   '0 0 40px rgba(0, 180, 162, 0.3)',
      },
    },
  },
  plugins: [],
}
