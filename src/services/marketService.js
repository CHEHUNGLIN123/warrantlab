import { stocks as mockStocks, warrants as mockWarrants } from "../mockData";
import { fetchListedWarrantDailyRows } from "../providers/twseProvider";

export async function getMarketSnapshot(symbol) {
  const stock = mockStocks[symbol];

  if (!stock) {
    return {
      stock: null,
      warrants: [],
      source: "NONE",
      realRowsCount: 0
    };
  }

  const realRows = await fetchListedWarrantDailyRows();

  return {
    stock,
    warrants: mockWarrants.filter((warrant) => warrant.underlying === symbol),
    source: realRows.length > 0 ? "TWSE + MOCK" : "MOCK",
    realRowsCount: realRows.length
  };
}