import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/fields/**/*.{js,ts,jsx,tsx,mdx}',
    './src/heros/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Header/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Footer/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]', 'class'],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2.5rem',
        md: '2.5rem',
        sm: '1rem',
        xl: '2.5rem',
      },
      screens: {
        ultrawide: '100rem', // 1920px
        '2xl': '90rem', // 1376px
        xl: '80rem', // 1280px
        lg: '64rem', // 1024px
        md: '48rem', // 768px
        sm: '40rem', // 640px
        xs: '25rem', // 400px
      },
    },
    extend: {
      screens: {
        ultrawide: '1920px',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        plusJakarta: ['var(--font-jakarta)', 'sans-serif'],
      },
      colors: {
        brand: '#ff0000',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography({
      target: 'modern',
    }),
  ],
}

export default config
