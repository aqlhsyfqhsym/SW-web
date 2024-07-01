// tailwind.config.js
module.exports = {
  content: [],
  theme: {
    extend: {
      spacing: {
        '128': '32rem', // Adjust the value as needed
        '256': '64rem', // Example for even larger sizes
      },
    },
  },
  variants: {},
  plugins: [
    require('flowbite/plugin'),
    // You can add other Tailwind CSS plugins here
  ],
}
