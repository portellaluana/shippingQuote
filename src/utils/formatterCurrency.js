export default {
  currencyBrazil: (value) => {
    const currency = parseFloat(value);
    if (isNaN(currency)) return "R$ 0,00";
    return currency.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  },
};
