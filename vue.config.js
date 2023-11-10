const { defineConfig } = require('@vue/cli-service')
const IN_PRODUCTION = process.env.NODE_ENV === "production";// /上正式站才壓縮圖片
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {//壓縮圖片
    IN_PRODUCTION &&
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif)(\?.*)?$/)
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false },
        })
        .end();
  },
  lintOnSave: false, //关闭eslint检查
  devServer: {
    https: true,//開發環境時使用 HTTPS
  },
  publicPath: './'
})
