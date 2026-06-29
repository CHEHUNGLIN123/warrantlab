import express from "express";
import cors from "cors";
import { MockMarketDataProvider } from "../../../packages/providers/src/index.js";
import { rankWarrants } from "../../../packages/calculator/src/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const provider = new MockMarketDataProvider();

app.get("/api/health", (req, res) => {
  res.json({ ok: true, version: "0.2.0" });
});

app.get("/api/v1/stocks/:symbol", async (req, res) => {
  const stock = await provider.getStock(req.params.symbol);
  res.json(stock);
});

app.get("/api/v1/warrants/:symbol", async (req, res) => {
  const warrants = await provider.getWarrants(req.params.symbol);
  const ranked = rankWarrants(warrants);

  res.json({
    underlying: req.params.symbol,
    count: ranked.length,
    data: ranked
  });
});

app.listen(port, () => {
  console.log(`WarrantLab API running at http://localhost:${port}`);
});
