// Função para formatar números como moeda brasileira
export function formatCurrency(value: number) {
  // Usa toLocaleString para formatar o número como moeda
  return value.toLocaleString("pt-BR", {
    style: "currency", // Formato de moeda
    currency: "BRL", // Moeda brasileira (Real)
  });
}
