import axios from "axios";

const apiCep = axios.create({
  baseURL: "https://servicodados.ibge.gov.br",
  headers: {
    "Content-Type": "application/json",
  },
});


export default apiCep;
