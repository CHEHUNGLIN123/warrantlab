# WarrantLab AI Agent Instructions

## Product Goal

WarrantLab is a Decision Engine for Taiwan warrants.

It is NOT:
- a market information website
- a quote table
- a broker clone

It helps users decide which warrant is most suitable.

## Architecture Rules

- Frontend must not perform financial calculations.
- Financial formulas live in `packages/calculator`.
- Domain types live in `packages/domain`.
- Provider abstractions live in `packages/providers`.
- API orchestrates providers and calculators.
- UI should not know whether data comes from TWSE, Fugle, mock data, or a broker.
- Ranking must be transparent and explainable.

## Current Release

v0.2 is a runnable MVP skeleton.

Primary user flow:

1. User inputs stock symbol, for example `2330`.
2. API returns stock data.
3. API returns related call warrants.
4. Calculator computes:
   - intrinsic value
   - time value
   - premium
   - leverage
   - ABCDE scenario returns
5. Ranking engine sorts warrants.
6. Frontend displays:
   - best recommendation
   - all ranked warrants

## Development Rules for Codex

Before coding:
1. Read this file.
2. Read all files in `docs/`.
3. Preserve the architecture unless explicitly instructed.

Do not:
- move calculator logic into Vue
- hardcode future provider assumptions in UI
- overcomplicate v0.2
- add broker order functionality

Do:
- keep code simple
- keep MVP runnable
- update docs when architecture changes
- explain major changes in commit message
