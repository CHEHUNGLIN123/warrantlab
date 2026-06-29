<script setup>
import { computed, ref } from "vue";
import { stocks, warrants } from "./mockData";
import { rankWarrants } from "./calculator";

const symbol = ref("2330");
const view = ref("recommend");
const stock = ref(null);
const ranked = ref([]);
const searched = ref(false);

const top = computed(() => ranked.value[0] || null);

function pct(value) {
  if (typeof value !== "number") return "-";
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(0)}%`;
}

function num(value) {
  if (typeof value !== "number") return "-";
  return value.toFixed(2);
}

function analyze() {
  const normalized = symbol.value.trim();
  const found = stocks[normalized];
  searched.value = true;

  if (!found) {
    stock.value = null;
    ranked.value = [];
    return;
  }

  stock.value = found;
  ranked.value = rankWarrants(
    warrants.filter((w) => w.underlying === normalized),
    found
  );
}

analyze();
</script>

<template>
  <main class="app">
    <header class="hero">
      <p class="eyebrow">WarrantLab Phase 1</p>
      <h1>權證決策引擎</h1>
      <p class="sub">從「查權證」變成「選權證」</p>

      <div class="search">
        <input v-model="symbol" inputmode="numeric" placeholder="2330" />
        <button @click="analyze">分析</button>
      </div>
    </header>

    <section v-if="stock" class="stock-card">
      <div>
        <span class="label">標的</span>
        <h2>{{ stock.name }} {{ stock.symbol }}</h2>
        <p class="muted">資料來源：{{ stock.source }}</p>
      </div>
      <div class="price">{{ stock.price }}</div>
    </section>

    <section v-if="!stock && searched" class="card">
      目前 Phase 1 內建 2330、2317、2454。請先輸入 2330 測試。
    </section>

    <nav v-if="ranked.length" class="tabs">
      <button :class="{ active: view === 'recommend' }" @click="view='recommend'">🔥 推薦</button>
      <button :class="{ active: view === 'all' }" @click="view='all'">🧾 全部</button>
    </nav>

    <section v-if="top && view === 'recommend'" class="card best">
      <p class="eyebrow">最佳推薦</p>
      <h2>{{ top.warrant.name }}</h2>
      <p class="muted">{{ top.warrant.symbol }}｜{{ top.reason }}</p>

      <div class="big-metric">
        <span>E 情境：標的 +30%</span>
        <strong>{{ pct(top.analysis.scenario.E) }}</strong>
      </div>

      <div class="grid">
        <div><span>Score</span><strong>{{ num(top.score) }}</strong></div>
        <div><span>內含價值</span><strong>{{ num(top.analysis.intrinsicValue) }}</strong></div>
        <div><span>含金量</span><strong>{{ pct(top.analysis.premium) }}</strong></div>
        <div><span>C 情境</span><strong>{{ pct(top.analysis.scenario.C) }}</strong></div>
      </div>

      <p class="notice">Phase 1 使用 mock data，僅供產品試用，不是投資建議。</p>
    </section>

    <section v-if="view === 'all'" class="list">
      <article v-for="(item, index) in ranked" :key="item.warrant.symbol" class="card">
        <div class="row">
          <div>
            <p class="rank">#{{ index + 1 }}</p>
            <h3>{{ item.warrant.name }}</h3>
            <p class="muted">
              {{ item.warrant.symbol }}｜履約 {{ item.warrant.strikePrice }}｜到期 {{ item.warrant.expiryDate }}
            </p>
          </div>
          <strong class="score">{{ num(item.score) }}</strong>
        </div>

        <div class="grid small">
          <div><span>內含</span><strong>{{ num(item.analysis.intrinsicValue) }}</strong></div>
          <div><span>含金量</span><strong>{{ pct(item.analysis.premium) }}</strong></div>
          <div><span>C</span><strong>{{ pct(item.analysis.scenario.C) }}</strong></div>
          <div><span>E</span><strong>{{ pct(item.analysis.scenario.E) }}</strong></div>
        </div>
      </article>
    </section>
  </main>
</template>
