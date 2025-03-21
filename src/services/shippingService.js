import api from "@/api/axios";

// Função para buscar cotação de frete
export const postShippingQuote = async (data) => {
  try {
    const response = await api.post("/shipping/quote", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cotação de frete:", error);
    throw error;
  }
};

// Função para buscar informações de CEP
export const getCepInfo = async (cep) => {
  try {
    const response = await api.get(`/CEP/Address/${cep}`);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição de CEP:", error);
  }
};

export const fetchCidades = async () => {
  try {
    // Alteração para acessar diretamente os municípios
    const response = await api.get(`/api/municipios`);

    // Verifique o retorno da API
    console.log("Cidades retornadas: ", response.data);

    // Extraímos apenas os nomes das cidades
    return response.data.map((cidade) => cidade.nome);
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    throw error;
  }
};
