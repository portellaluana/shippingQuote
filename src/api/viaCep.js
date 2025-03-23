import axiosCep from "axios";

const apiViaCep = axiosCep.create({
  baseURL: "https://viacep.com.br/ws",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiViaCep;
