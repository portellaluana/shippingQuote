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
      "/ws": {
        target: "https://viacep.com.br",
        changeOrigin: true,
        pathRewrite: {
          "^/ws/(.*)": "/ws/$1",
        },
      },
    },
  },
};
