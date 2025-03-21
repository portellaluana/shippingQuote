// vue.config.js
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
      "/api/municipios": {
        target: "https://servicodados.ibge.gov.br", // Altere para o IBGE
        changeOrigin: true,
        pathRewrite: { "^/api/municipios": "/api/v1/localidades/municipios" }, // Ajuste o caminho para retornar todos os municípios
        secure: true,
      },
    },
  },
};
