/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,js,astro}'],
    theme: {
      screens: {
        tablet: '800px',
        desktop: '1150px',
        'desktop-s': '1250px',
        'desktop-m': '1400px',
        'desktop-l': '1600px',
        'desktop-xl': '1800px',
      },
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-primary-70': 'var(--bg-primary-70)',
        'fg-primary': 'var(--fg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'fg-secondary': 'var(--fg-secondary)',
        'clr-primary': 'var(--clr-primary)',
        'clr-secondary': 'var(--clr-secondary)',
        'contrast': 'var(--contrast-border)'
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
      extend: {
        boxShadow: {
          header: `0px -3px 15px 0px`,
        },
        minHeight: {
          section: '25rem'
        },
        width: {
          'content-double': '34rem',
          'content-single': '78rem',
          150: '58rem',
          200: '96rem'
        },
        scale: {
          102: '1.02'
        },
        grayscale: {
          50: '50%'
        },
        objectPosition: {
          feats: '0 45%'
        }
      }
    },
  }