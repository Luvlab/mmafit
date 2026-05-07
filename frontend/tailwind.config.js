/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mma-black':   'var(--bg-primary)',
        'mma-dark':    'var(--bg-secondary)',
        'mma-card':    'var(--bg-card)',
        'mma-red':     'var(--accent)',
        'mma-red-h':   'var(--accent-hover)',
        'mma-white':   'var(--text-primary)',
        'mma-gray':    'var(--text-secondary)',
        'mma-muted':   'var(--text-muted)',
        'mma-border':  'var(--border)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Barlow Condensed', 'Impact', 'sans-serif'],
      },
      animation: {
        'fade-in':      'fadeIn 0.6s ease forwards',
        'slide-up':     'slideUp 0.5s ease forwards',
        'slide-down':   'slideDown 0.3s ease forwards',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glow:      { from: { boxShadow: '0 0 10px var(--accent)' }, to: { boxShadow: '0 0 25px var(--accent), 0 0 50px var(--accent)' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
