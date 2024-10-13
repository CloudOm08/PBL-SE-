module.exports = {
  purge: {
    content: ['./src/**/*.{html,js}', './public/index.html'], // Adjust paths as necessary
    options: {
      safelist: ['bg-slate-900'], // This line ensures the bg-slate-900 class is preserved
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
