module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://backend:3000'
  }
}
