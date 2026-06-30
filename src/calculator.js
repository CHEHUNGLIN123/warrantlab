const DEFAULT_SCENARIOS = {
  A: -0.1,
  B: 0,
  C: 0.1,
  D: 0.2,
  E: 0.3
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function calcRemainingDays(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diff = Math.ceil((expiry - today) / DAY_MS);
  return Math.max(diff, 0);
}

export function calcIntrinsicValue(warrant, underlyingPrice) {
  if (warrant.type !== "CALL") return 0;
  return Math.max((underlyingPrice - warrant.strikePrice) * warrant.ratio, 0);
}

export function calcScenarioReturn(warrant, underlyingPrice, change) {
  const futureUnderlyingPrice = underlyingPrice * (1 + change);
  const futureIntrinsicValue = calcIntrinsicValue(warrant, futureUnderlyingPrice);

  if (!warrant.price || warrant.price <= 0) return 0;

  return (futureIntrinsicValue - warrant.price) / warrant.price;
}

export function analyzeWarrant(warrant, stock) {
  const remainingDays = calcRemainingDays(warrant.expiryDate);
  const intrinsicValue = calcIntrinsicValue(warrant, stock.price);
  const timeValue = Math.max(warrant.price - intrinsicValue, 0);
  const premium = warrant.price > 0 ? timeValue / warrant.price : 0;

  const scenarios = Object.fromEntries(
    Object.entries(DEFAULT_SCENARIOS).map(([key, change]) => [
      key,
      calcScenarioReturn(warrant, stock.price, change)
    ])
  );

  const scenarioAverage =
    (scenarios.C + scenarios.D + scenarios.E) / 3;

  const daysScore =
    remainingDays >= 45 && remainingDays <= 180
      ? 20
      : remainingDays > 180
        ? 12
        : 5;

  const intrinsicScore = intrinsicValue > 0 ? intrinsicValue * 4 : 0;
  const premiumPenalty = premium * 25;
  const upsideScore = scenarioAverage * 60;

  const score =
    upsideScore +
    daysScore +
    intrinsicScore -
    premiumPenalty;

  return {
    ...warrant,
    remainingDays,
    intrinsicValue,
    timeValue,
    premium,
    scenarios,
    scenarioAverage,
    score,
    reason: buildReason({
      remainingDays,
      intrinsicValue,
      premium,
      scenarios,
      score
    })
  };
}

export function rankWarrants(warrants, stock) {
  return warrants
    .filter((warrant) => warrant.type === "CALL")
    .map((warrant) => analyzeWarrant(warrant, stock))
    .sort((a, b) => b.score - a.score);
}

function buildReason({ remainingDays, intrinsicValue, premium, scenarios }) {
  const reasons = [];

  if (remainingDays >= 45 && remainingDays <= 180) {
    reasons.push("剩餘天數落在較適合觀察區間");
  }

  if (intrinsicValue > 0) {
    reasons.push("已有內含價值");
  }

  if (premium <= 0.35) {
    reasons.push("含金量相對較低");
  }

  if (scenarios.E > 1) {
    reasons.push("E 情境上檔彈性較高");
  }

  if (reasons.length === 0) {
    reasons.push("綜合情境報酬與價格條件排序");
  }

  return reasons;
}

export function formatPercent(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(0)}%`;
}

export function formatNumber(value, digits = 2) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  return value.toFixed(digits);
}