# Ranking

## Goal

Ranking must be transparent.

The user should understand why a warrant is recommended.

## MVP Score

Initial score combines:

- Scenario E return
- Scenario C return
- Intrinsic value
- Premium penalty

## Current Idea

Higher is better:

```txt
score =
  scenarioE × 50
+ scenarioC × 30
+ intrinsicValue × 2
- premium × 20
```

## Explainability

Each ranked item should include a short reason.

Examples:
- High upside scenario return
- Low premium
- Strong intrinsic value
