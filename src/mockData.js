export const stocks = {
  "2330": { symbol: "2330", name: "台積電", price: 1095, source: "MOCK" },
  "2454": { symbol: "2454", name: "聯發科", price: 1280, source: "MOCK" },
  "6770": { symbol: "6770", name: "力積電", price: 21.8, source: "MOCK" }
};

export const warrants = [
  { symbol: "050101", name: "台積電凱基26購01", type: "CALL", underlying: "2330", strikePrice: 950, ratio: 0.1, price: 18.5, expiryDate: "2026-09-20" },
  { symbol: "050102", name: "台積電元大26購02", type: "CALL", underlying: "2330", strikePrice: 1000, ratio: 0.1, price: 13.2, expiryDate: "2026-08-15" },
  { symbol: "050103", name: "台積電群益26購03", type: "CALL", underlying: "2330", strikePrice: 1050, ratio: 0.1, price: 9.6, expiryDate: "2026-07-18" },
  { symbol: "050104", name: "台積電永豐26購04", type: "CALL", underlying: "2330", strikePrice: 1100, ratio: 0.1, price: 6.8, expiryDate: "2026-10-22" },
  { symbol: "050105", name: "台積電國泰26購05", type: "CALL", underlying: "2330", strikePrice: 1150, ratio: 0.1, price: 4.9, expiryDate: "2026-11-20" },
  { symbol: "050106", name: "台積電富邦26購06", type: "CALL", underlying: "2330", strikePrice: 1200, ratio: 0.1, price: 3.6, expiryDate: "2026-12-18" },
  { symbol: "050107", name: "台積電統一26購07", type: "CALL", underlying: "2330", strikePrice: 1250, ratio: 0.1, price: 2.7, expiryDate: "2026-09-18" },
  { symbol: "050108", name: "台積電兆豐26購08", type: "CALL", underlying: "2330", strikePrice: 1300, ratio: 0.1, price: 2.1, expiryDate: "2026-08-21" },
  { symbol: "050109", name: "台積電中信26購09", type: "CALL", underlying: "2330", strikePrice: 1080, ratio: 0.08, price: 5.2, expiryDate: "2026-07-31" },
  { symbol: "050110", name: "台積電元富26購10", type: "CALL", underlying: "2330", strikePrice: 1120, ratio: 0.12, price: 7.1, expiryDate: "2026-10-30" },

  { symbol: "070101", name: "聯發科凱基26購01", type: "CALL", underlying: "2454", strikePrice: 1100, ratio: 0.05, price: 13.8, expiryDate: "2026-09-20" },
  { symbol: "070102", name: "聯發科元大26購02", type: "CALL", underlying: "2454", strikePrice: 1150, ratio: 0.05, price: 11.2, expiryDate: "2026-08-15" },
  { symbol: "070103", name: "聯發科群益26購03", type: "CALL", underlying: "2454", strikePrice: 1200, ratio: 0.05, price: 8.6, expiryDate: "2026-07-18" },
  { symbol: "070104", name: "聯發科永豐26購04", type: "CALL", underlying: "2454", strikePrice: 1250, ratio: 0.05, price: 6.2, expiryDate: "2026-10-22" },
  { symbol: "070105", name: "聯發科國泰26購05", type: "CALL", underlying: "2454", strikePrice: 1300, ratio: 0.05, price: 4.8, expiryDate: "2026-11-20" },
  { symbol: "070106", name: "聯發科富邦26購06", type: "CALL", underlying: "2454", strikePrice: 1350, ratio: 0.05, price: 3.6, expiryDate: "2026-12-18" },
  { symbol: "070107", name: "聯發科統一26購07", type: "CALL", underlying: "2454", strikePrice: 1400, ratio: 0.05, price: 2.8, expiryDate: "2026-09-18" },
  { symbol: "070108", name: "聯發科兆豐26購08", type: "CALL", underlying: "2454", strikePrice: 1450, ratio: 0.05, price: 2.2, expiryDate: "2026-08-21" },
  { symbol: "070109", name: "聯發科中信26購09", type: "CALL", underlying: "2454", strikePrice: 1180, ratio: 0.04, price: 5.8, expiryDate: "2026-07-31" },
  { symbol: "070110", name: "聯發科元富26購10", type: "CALL", underlying: "2454", strikePrice: 1320, ratio: 0.06, price: 5.1, expiryDate: "2026-10-30" },

  { symbol: "080101", name: "力積電凱基26購01", type: "CALL", underlying: "6770", strikePrice: 18, ratio: 0.5, price: 2.6, expiryDate: "2026-09-20" },
  { symbol: "080102", name: "力積電元大26購02", type: "CALL", underlying: "6770", strikePrice: 20, ratio: 0.5, price: 1.8, expiryDate: "2026-08-15" },
  { symbol: "080103", name: "力積電群益26購03", type: "CALL", underlying: "6770", strikePrice: 22, ratio: 0.5, price: 1.2, expiryDate: "2026-07-18" },
  { symbol: "080104", name: "力積電永豐26購04", type: "CALL", underlying: "6770", strikePrice: 24, ratio: 0.5, price: 0.82, expiryDate: "2026-10-22" },
  { symbol: "080105", name: "力積電國泰26購05", type: "CALL", underlying: "6770", strikePrice: 26, ratio: 0.5, price: 0.55, expiryDate: "2026-11-20" },
  { symbol: "080106", name: "力積電富邦26購06", type: "CALL", underlying: "6770", strikePrice: 28, ratio: 0.5, price: 0.38, expiryDate: "2026-12-18" },
  { symbol: "080107", name: "力積電統一26購07", type: "CALL", underlying: "6770", strikePrice: 30, ratio: 0.5, price: 0.28, expiryDate: "2026-09-18" },
  { symbol: "080108", name: "力積電兆豐26購08", type: "CALL", underlying: "6770", strikePrice: 32, ratio: 0.5, price: 0.2, expiryDate: "2026-08-21" },
  { symbol: "080109", name: "力積電中信26購09", type: "CALL", underlying: "6770", strikePrice: 21, ratio: 0.4, price: 0.95, expiryDate: "2026-07-31" },
  { symbol: "080110", name: "力積電元富26購10", type: "CALL", underlying: "6770", strikePrice: 25, ratio: 0.6, price: 0.88, expiryDate: "2026-10-30" }
];