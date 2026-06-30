<script setup>
import { computed, ref } from "vue";
import { stocks, warrants } from "./mockData";
import { rankWarrants, formatPercent, formatNumber } from "./calculator";

const symbol = ref("2330");
const view = ref("top5");
const searched = ref(false);

const stock = computed(() => stocks[symbol.value.trim()] || null);

const ranked = computed(() => {
  if (!stock.value) return [];
  return rankWarrants(
    warrants.filter((w) => w.underlying === stock.value.symbol),
    stock.value
  );
});

const top5 = computed(() => ranked.value.slice(0, 5));

function analyze() {
  searched.value = true;
  view.value = "top5";
}
</script>

<template>
  <main class="app">
    <header class="hero">
      <p class="eyebrow">WarrantLab Sprint 2C Beta</p>
      <h1>認購權證 Top 5 決策輔助</h1>
      <p class="sub">ABCDE 50%｜含金量 30%｜剩餘天數 20%</p>

      <div class="search">
        <input v-model="symbol" inputmode="numeric" placeholder="輸入 2330 / 2454 / 6770" />
        <button @click="analyze">分析</button>
      </div>

      <p class="notice dark">Demo / mock data，僅供決策輔助，不是投資建議。</p>
    </header>

    <section v-if="stock" class="stock-card">
      <div>
        <span class="label">標的</span>
        <h2>{{ stock.name }} {{ stock.symbol }}</h2>
        <p class="muted">資料來源：{{ stock.source }}</p>
      </div>
      <div class="price">{{ stock.price }}</div>
    </section>

    <section v-else-if="searched" class="card">
      目前支援 2330 台積電、2454 聯發科、6770 力積電。
    </section>

    <nav v-if="stock" class="tabs">
      <button :class="{ active: view === 'top5' }" @click="view = 'top5'">🔥 Top 5</button>
      <button :class="{ active: view === 'all' }" @click="view = 'all'">🧾 全部權證</button>
    </nav>

    <section v-if="stock && view === 'top5'" class="list">
      <article v-for="(item, index) in top5" :key="item.symbol" class="card best">
        <div class="row">
          <div>
            <p class="rank">TOP {{ index + 1 }}</p>
            <h3>{{ item.name }}</h3>
            <p class="muted">{{ item.symbol }}｜履約 {{ item.strikePrice }}｜到期 {{ item.expiryDate }}</p>
          </div>
          <strong class="score">WLS {{ formatNumber(item.score, 1) }}</strong>
        </div>

        <div class="grid">
          <div><span>剩餘天數</span><strong>{{ item.remainingDays }} 天</strong></div>
          <div><span>內含價值</span><strong>{{ formatNumber(item.intrinsicValue) }}</strong></div>
          <div><span>含金量</span><strong>{{ formatPercent(item.premium) }}</strong></div>
          <div><span>平均情境</span><strong>{{ formatPercent(item.scenarioAverage) }}</strong></div>
        </div>

        <div class="scenario">
          <div v-for="key in ['A','B','C','D','E']" :key="key">
            <span>{{ key }}</span>
            <strong>{{ formatPercent(item.scenarios[key]) }}</strong>
          </div>
        </div>

        <div class="reason">
          <p>推薦理由</p>
          <ul>
            <li v-for="reason in item.reason" :key="reason">{{ reason }}</li>
          </ul>
        </div>
      </article>
    </section>

    <section v-if="stock && view === 'all'" class="list">
      <article v-for="(item, index) in ranked" :key="item.symbol" class="card">
        <div class="row">
          <div>
            <p class="rank">#{{ index + 1 }}</p>
            <h3>{{ item.name }}</h3>
            <p class="muted">{{ item.symbol }}｜履約 {{ item.strikePrice }}｜到期 {{ item.expiryDate }}</p>
          </div>
          <strong class="score">{{ formatNumber(item.score, 1) }}</strong>
        </div>

        <div class="grid small">
          <div><span>天數</span><strong>{{ item.remainingDays }}</strong></div>
          <div><span>內含</span><strong>{{ formatNumber(item.intrinsicValue) }}</strong></div>
          <div><span>含金量</span><strong>{{ formatPercent(item.premium) }}</strong></div>
          <div><span>E</span><strong>{{ formatPercent(item.scenarios.E) }}</strong></div>
        </div>
      </article>
    </section>
  </main>
</template>