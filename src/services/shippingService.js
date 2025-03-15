import axios from "axios";

export const getShippingQuote = async (data) => {
  try {
    const response = await axios.post("/shipping/quote", data, {
      headers: {
        "Content-Type": "application/json",
        token: "AAABBB2222CCC222DD222",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cotação de frete:", error);
    throw error;
  }
};
