import axios from "axios";

export const getShippingQuote = async (data) => {
  try {
    const response = await axios.post("/shipping/quote", data, {
      headers: {
        "Content-Type": "application/json",
        token: "B361B7C6R2FD1R4410RBE95RF4F455B8AB96",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cotação de frete:", error);
    throw error;
  }
};
