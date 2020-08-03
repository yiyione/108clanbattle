const config = require('./config.json');

module.exports = {
  "devServer": {
    "proxy": "http://localhost"
  },
  "transpileDependencies": [
    "vue-echarts",
    "resize-detector",
    "vuetify"
  ]
}
