module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '17': 'repeat(17, minmax(0, 1fr))',
      }
    }
  },
  plugins: []
}