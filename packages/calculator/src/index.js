export function calcIntrinsicValue(warrant, underlyingPrice = warrant.underlyingPrice) {
  return Math.max((underlyingPrice - warrant.strikePrice) * warrant.ratio, 0);
}

export function calcTimeValue(warrant, intrinsicValue) {
  return Math.max(warrant.price - intrinsicValue, 0);
}

export function calcPremium(warrant, timeValue) {
  if (!warrant.price || warrant.price <= 0) return 0;
  return timeValue / warrant.price;
}

export function buildScenario(warrant) {
  const scenarios = {
    A: -0.10,
    B: 0,
    C: 0.10,
    D: 0.20,
    E: 0.30
  };

  const result = {};

  for (const [key, change] of Object.entries(scenarios)) {
    const newUnderlyingPrice = warrant.underlyingPrice * (1 + change);
    const newIntrinsic = calcIntrinsicValue(warrant, newUnderlyingPrice);
    const pnl = newIntrinsic - warrant.price;
    result[key] = warrant.price > 0 ? pnl / warrant.price : 0;
  }

  return result;
}

export function analyzeWarrant(warrant) {
  const intrinsicValue = calcIntrinsicValue(warrant);
  const timeValue = calcTimeValue(warrant, intrinsicValue);
  const premium = calcPremium(warrant, timeValue);
  const scenario = buildScenario(warrant);

  const leverage = scenario.C / 0.10;

  return {
    intrinsicValue,
    timeValue,
    premium,
    leverage,
    scenario
  };
}

export function scoreWarrant(warrant, analysis) {
  return (
    analysis.scenario.E * 50 +
    analysis.scenario.C * 30 +
    analysis.intrinsicValue * 2 -
    analysis.premium * 20
  );
}

export function explainWarrant(analysis) {
  if (analysis.scenario.E > 2) return "High upside in E scenario";
  if (analysis.premium < 0.3) return "Low premium and better value";
  if (analysis.intrinsicValue > 0) return "Has intrinsic value";
  return "Ranked by scenario and value score";
}

export function rankWarrants(warrants) {
  return warrants
    .map((warrant) => {
      const analysis = analyzeWarrant(warrant);
      const score = scoreWarrant(warrant, analysis);
      return {
        warrant,
        analysis,
        score,
        reason: explainWarrant(analysis)
      };
    })
    .sort((a, b) => b.score - a.score);
}
