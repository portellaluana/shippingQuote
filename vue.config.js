module.exports = {
  devServer: {
    proxy: {
      "/shipping/quote": {
        target: "https://api.frenet.com.br",
        changeOrigin: true,
        pathRewrite: { "^/shipping/quote": "/shipping/quote" },
      },
      "/tracking/trackinginfo": {
        target: "https://api.frenet.com.br",
        changeOrigin: true,
        pathRewrite: { "^/tracking/trackinginfo": "/tracking/trackinginfo" },
      },
      "/CEP/Address/": {
        target: "https://api.frenet.com.br",
        changeOrigin: true,
        pathRewrite: {
          "^/CEP/Address/": "/CEP/Address/",
        },
      },
    },
  },
};
