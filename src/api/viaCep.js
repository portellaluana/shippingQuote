import axiosCep from "axios";

const apiViaCep = axiosCep.create({
  baseURL: "", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiViaCep;
