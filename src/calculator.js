export function intrinsicValue(warrant, underlyingPrice) {
  return Math.max((underlyingPrice - warrant.strikePrice) * warrant.ratio, 0);
}

export function scenarioReturn(warrant, underlyingPrice, change) {
  const futureUnderlying = underlyingPrice * (1 + change);
  const futureIntrinsic = intrinsicValue(warrant, futureUnderlying);
  return warrant.price > 0 ? (futureIntrinsic - warrant.price) / warrant.price : 0;
}

export function analyzeWarrant(warrant, stock) {
  const intrinsic = intrinsicValue(warrant, stock.price);
  const timeValue = Math.max(warrant.price - intrinsic, 0);
  const premium = warrant.price > 0 ? timeValue / warrant.price : 0;

  const scenario = {
    A: scenarioReturn(warrant, stock.price, -0.1),
    B: scenarioReturn(warrant, stock.price, 0),
    C: scenarioReturn(warrant, stock.price, 0.1),
    D: scenarioReturn(warrant, stock.price, 0.2),
    E: scenarioReturn(warrant, stock.price, 0.3)
  };

  const score = scenario.E * 50 + scenario.C * 30 + intrinsic * 2 - premium * 20;

  let reason = "綜合情境報酬與含金量排序";
  if (scenario.E > 2) reason = "E 情境爆發力高";
  if (premium < 0.25) reason = "含金量較低，時間價值壓力較小";
  if (intrinsic > 0 && premium < 0.4) reason = "已有內含價值且含金量合理";

  return {
    warrant,
    analysis: { intrinsicValue: intrinsic, timeValue, premium, scenario },
    score,
    reason
  };
}

export function rankWarrants(warrants, stock) {
  return warrants
    .map((warrant) => analyzeWarrant(warrant, stock))
    .sort((a, b) => b.score - a.score);
}
