/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-in-out forwards',
        'fade-in-left': 'fade-in-left 0.4s ease-in-out forwards',
        'fade-in-up': 'fade-in-up 0.4s ease-in-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDelay: {
        1500: '1500ms',
        2000: '2000ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
};
