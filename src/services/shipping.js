import apiFrenet from "@/api/frenet";

export const postShippingQuote = (data) => {
  return apiFrenet
    .post("/shipping/quote", data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Erro ao buscar cotação de frete:", error);
      throw error;
    });
};
