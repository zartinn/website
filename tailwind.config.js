/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,astro}'],
    theme: {
      colors: {
        'dark-bg-p': '#1E1E1E',
        'dark-bg-s': '#2B2B2B',
        'dark-clr-p': '#8AC7FF',
        'light-bg-p': '#FFFDF9',
        'light-bg-s': '#FFFBF3',
        'light-clr-p': '#415E79',
      },
      fontFamily: {
        americano: 'GT Americano',
      },
      fontSize: {
        'h1': ['3.75rem', { letterSpacing: '1px', lineHeight: '4.5rem' }],    // 60/72
        'h2': ['2.25rem', { letterSpacing: '1px', lineHeight: '2.5rem' }],    // 36/40
        'h3': ['1.875rem', { letterSpacing: '1px', lineHeight: '2.25rem' }],  // 30/36
        'body': ['1.25rem', { letterSpacing: '1px', lineHeight: '1.75rem' }], // 20/28
        'html-default': '16px',
        'html-xs': '12px',
        'html-s': '13px',
        'html-m': '14px',
        'html-l': '15px',
      },
      extend: {}
    },
  }