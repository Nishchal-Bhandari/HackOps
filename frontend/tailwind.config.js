/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        success: '#ffffff',
        warning: '#cccccc',
        danger: '#888888',
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
      },
    },
  },
  plugins: [],
}
