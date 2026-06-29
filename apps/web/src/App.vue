<script setup>
import { computed, ref } from "vue";

const symbol = ref("2330");
const stock = ref(null);
const warrants = ref([]);
const loading = ref(false);
const error = ref("");

const top = computed(() => warrants.value[0] || null);

function pct(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  return `${(value * 100).toFixed(0)}%`;
}

function num(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  return value.toFixed(2);
}

async function analyze() {
  loading.value = true;
  error.value = "";
  stock.value = null;
  warrants.value = [];

  try {
    const apiBase = "http://localhost:3000";

    const stockRes = await fetch(`${apiBase}/api/v1/stocks/${symbol.value}`);
    stock.value = await stockRes.json();

    const warrantRes = await fetch(`${apiBase}/api/v1/warrants/${symbol.value}`);
    const warrantJson = await warrantRes.json();

    warrants.value = warrantJson.data || [];
  } catch (err) {
    error.value = "無法連線 API。請確認 apps/api 已啟動。";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="page">
    <section class="header">
      <h1>WarrantLab</h1>
      <p class="meta">從「查權證」變成「選權證」</p>

      <div class="search">
        <input v-model="symbol" placeholder="輸入股票代號，例如 2330" />
        <button @click="analyze" :disabled="loading">
          {{ loading ? "分析中..." : "分析" }}
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </section>

    <section v-if="stock" class="card">
      <h2>{{ stock.name }} ({{ stock.symbol }})</h2>
      <p>標的價格：{{ stock.price }}</p>
      <p class="meta">資料來源：{{ stock.source }}</p>
    </section>

    <section v-if="top" class="card best">
      <h2>🔥 最佳推薦</h2>
      <h3>{{ top.warrant.name }}</h3>
      <p class="meta">{{ top.warrant.symbol }}｜{{ top.reason }}</p>

      <div class="metrics">
        <div class="metric">
          <span>Score</span>
          <strong>{{ num(top.score) }}</strong>
        </div>
        <div class="metric">
          <span>內含價值</span>
          <strong>{{ num(top.analysis.intrinsicValue) }}</strong>
        </div>
        <div class="metric">
          <span>含金量</span>
          <strong>{{ pct(top.analysis.premium) }}</strong>
        </div>
        <div class="metric">
          <span>E 情境</span>
          <strong>{{ pct(top.analysis.scenario.E) }}</strong>
        </div>
      </div>

      <div class="reason">
        👉 系統建議：這檔目前在 mock 資料中排序最高。請先用於產品測試，不可視為投資建議。
      </div>
    </section>

    <section v-if="warrants.length" class="card">
      <h2>🧾 全部權證 Ranking</h2>

      <div v-for="(item, index) in warrants" :key="item.warrant.symbol" class="card">
        <h3>#{{ index + 1 }} {{ item.warrant.name }}</h3>
        <p class="meta">
          {{ item.warrant.symbol }}｜履約價 {{ item.warrant.strikePrice }}｜到期 {{ item.warrant.expiryDate }}
        </p>

        <div class="metrics">
          <div class="metric">
            <span>Score</span>
            <strong>{{ num(item.score) }}</strong>
          </div>
          <div class="metric">
            <span>內含價值</span>
            <strong>{{ num(item.analysis.intrinsicValue) }}</strong>
          </div>
          <div class="metric">
            <span>C 情境</span>
            <strong>{{ pct(item.analysis.scenario.C) }}</strong>
          </div>
          <div class="metric">
            <span>E 情境</span>
            <strong>{{ pct(item.analysis.scenario.E) }}</strong>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
