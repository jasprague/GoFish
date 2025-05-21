/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        fontSize: {
          'xs': '1rem', // 10px
          'base': '1.6rem', // 16px
          'lg': '2.4rem', // 24px
          'xl': '3.2rem', // 32px
          '2xl': '4.8rem', // 48px
          '3xl': '7.2rem', // 72px
          '4xl': '10rem', // 100px
        },
    },
  },
  plugins: [],
}