module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // vantui
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
