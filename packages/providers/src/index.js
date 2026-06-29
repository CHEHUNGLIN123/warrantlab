export class MockMarketDataProvider {
  async getStock(symbol) {
    const stocks = {
      "2330": {
        symbol: "2330",
        name: "台積電",
        price: 1095,
        source: "MOCK"
      },
      "2317": {
        symbol: "2317",
        name: "鴻海",
        price: 210,
        source: "MOCK"
      },
      "2454": {
        symbol: "2454",
        name: "聯發科",
        price: 1280,
        source: "MOCK"
      }
    };

    return stocks[symbol] || {
      symbol,
      name: "未知標的",
      price: 100,
      source: "MOCK"
    };
  }

  async getWarrants(symbol) {
    const stock = await this.getStock(symbol);

    const mockBySymbol = {
      "2330": [
        {
          symbol: "050123",
          name: "台積電凱基25購01",
          underlying: "2330",
          underlyingPrice: stock.price,
          strikePrice: 1000,
          ratio: 0.1,
          price: 12.5,
          issuer: "凱基",
          expiryDate: "2026-09-20",
          type: "CALL"
        },
        {
          symbol: "050124",
          name: "台積電元大25購02",
          underlying: "2330",
          underlyingPrice: stock.price,
          strikePrice: 1050,
          ratio: 0.1,
          price: 8.2,
          issuer: "元大",
          expiryDate: "2026-08-15",
          type: "CALL"
        },
        {
          symbol: "050125",
          name: "台積電群益25購03",
          underlying: "2330",
          underlyingPrice: stock.price,
          strikePrice: 1150,
          ratio: 0.1,
          price: 4.8,
          issuer: "群益",
          expiryDate: "2026-07-18",
          type: "CALL"
        }
      ],
      "2317": [
        {
          symbol: "060101",
          name: "鴻海元大25購01",
          underlying: "2317",
          underlyingPrice: stock.price,
          strikePrice: 200,
          ratio: 0.2,
          price: 3.6,
          issuer: "元大",
          expiryDate: "2026-09-20",
          type: "CALL"
        }
      ],
      "2454": [
        {
          symbol: "070101",
          name: "聯發科凱基25購01",
          underlying: "2454",
          underlyingPrice: stock.price,
          strikePrice: 1200,
          ratio: 0.05,
          price: 7.5,
          issuer: "凱基",
          expiryDate: "2026-10-20",
          type: "CALL"
        }
      ]
    };

    return mockBySymbol[symbol] || [];
  }
}
