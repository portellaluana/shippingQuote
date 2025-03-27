const webpack = require("webpack");

module.exports = {
  devServer: {
    proxy: {
      "/shipping/quote": {
        target: "https://api.frenet.com.br",
        changeOrigin: true,
        pathRewrite: { "^/shipping/quote": "/shipping/quote" },
        secure: true,
      },
      "/CEP/Address/": {
        target: "https://api.frenet.com.br",
        changeOrigin: true,
        pathRewrite: { "^/CEP/Address/": "/CEP/Address/" },
        secure: true,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
      }),
    ],
  },
};
