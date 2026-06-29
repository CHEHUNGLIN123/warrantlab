# Decision Log

## Decision 1: Decision Engine, not information website

WarrantLab should optimize for decision speed.

## Decision 2: Provider independence

TWSE, Fugle, and future broker APIs are providers.

The frontend must not know the source.

## Decision 3: Calculator independence

Financial formulas must be testable and independent from API/UI.

## Decision 4: Ranking transparency

Users can choose whether to trust the recommendation or inspect all warrants.

## Decision 5: v0.2 uses mock data

Mock data is acceptable for validating the product flow.

Real provider integration comes later.
