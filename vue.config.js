module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/snake_game_p5_vue/'
    : '/'
}
