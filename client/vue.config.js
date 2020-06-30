const config = require('./config.json');

module.exports = {
  "devServer": {
    "proxy": config.defaultProxy
  },
  "transpileDependencies": [
    "vue-echarts",
    "resize-detector",
    "vuetify"
  ]
}
