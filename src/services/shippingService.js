import api from "@/api/axios";

export const postShippingQuote = async (data) => {
  try {
    const response = await api.post("/shipping/quote", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cotação de frete:", error);
    throw error;
  }
};

export const getCepInfo = async (cep) => {
  try {
    const response = await api.get(`/CEP/Address/${cep}`);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição de CEP:", error);
  }
};

export const getCidades = async (estado) => {
  try {
    const response = await api.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
    );
    return response.data || [];
  } catch (error) {
    console.error("Erro na requisição:", error);
    return [];
  }
};

export const getCep = async (estado, cidade, rua) => {
  console.log(estado, cidade, rua);

  try {
    const response = await api.get(`/ws/${estado}/${cidade}/${rua}/json/`);

    return response.data;
  } catch (error) {
    console.error("Erro na requisição de CEP:", error);
    throw error;
  }
};
