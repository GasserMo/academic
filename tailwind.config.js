/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'headline-large': ['32px', { lineHeight: '40px', letterSpacing: '0em', fontWeight: '500' }],
        'headline-medium': ['28px', { lineHeight: '36px', letterSpacing: '0em' }],
        'headline-small': ['24px', { lineHeight: '32px', letterSpacing: '0em' }],
        'headline-black': ['20px', { lineHeight: '40px', fontWeight: '500' }],
        'headline-title': ['18px', { lineHeight: '40px', fontWeight: '500' }],
        'headline-email-grey': ['14px', { lineHeight: '40px' }],
      },
      colors: {
        greenPrimary: '#26B170',
        greenSecondary: '#1E8E5A',
        greenTertiary: '#30D286',
        bluePrimary: '#00769E',
        blueSecondary: '#007EA7',
        blueTertiary: '#00BCFB',
        blueHover: '#00769E14',
      },

    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
