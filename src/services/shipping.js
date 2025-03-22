import apiFrenet from "@/api/frenet";
import apiCep from "@/api/ibgeCep";
import apiViaCep from "@/api/viaCep";

export const postShippingQuote = (data) => {
  return apiFrenet
    .post("/shipping/quote", data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar cotação de frete:", error);
      throw error;
    });
};

export const getCepInfo = (cep) => {
  return apiFrenet
    .get(`/CEP/Address/${cep}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro na requisição de CEP:", error);
    });
};

export const getCidades = (estado) => {
  return apiCep
    .get(`/api/v1/localidades/estados/${estado}/municipios`)
    .then((response) => response.data || [])
    .catch((error) => {
      console.error("Erro na requisição:", error);
      return [];
    });
};

export const getCep = (estado, cidade, rua) => {
  console.log(estado, cidade, rua);

  return apiViaCep
    .get(`/ws/${estado}/${cidade}/${rua}/json/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Erro na requisição de CEP:", error);
      throw error;
    });
};
