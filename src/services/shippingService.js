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
