module.exports = {
  devServer: {
    proxy: {
      "/shipping/quote": {
        target: "https://private-anon-26c05fbe5d-frenetapi.apiary-mock.com",
        changeOrigin: true,
        pathRewrite: { "^/shipping/quote": "/shipping/quote" },
      },
      "/tracking/trackinginfo": {
        target: "https://private-anon-26c05fbe5d-frenetapi.apiary-mock.com",
        changeOrigin: true,
        pathRewrite: { "^/tracking/trackinginfo": "/tracking/trackinginfo" },
      },
    },
  },
};
