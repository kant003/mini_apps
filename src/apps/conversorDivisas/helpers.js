export const formatCurrency = (value, code) => {
  try {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: code }).format(value);
  } catch {
    return (Math.round(value * 100) / 100) + " " + code;
  }
};

export const convert = (amount, from, to, rates) => {
  if (isNaN(amount)) return NaN;
  if (from === to) return amount;
  if (!rates || typeof rates.EUR !== "number" || typeof rates.USD !== "number") {
    throw new Error("Tasas inválidas");
  }
  if (from === "USD" && to === "EUR") return amount * rates.EUR;
  if (from === "EUR" && to === "USD") return amount * (1 / rates.EUR);
  const toUSD = from === "USD" ? amount : amount * (1 / rates[from]);
  return to === "USD" ? toUSD : toUSD * rates[to];
};
