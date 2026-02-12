export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Fira Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    container: false,
  },
};
