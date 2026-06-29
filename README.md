# WarrantLab

A Decision Engine for Taiwan warrants.

## Vision

From searching warrants to choosing warrants.

## v0.2 Release Scope

This starter contains a runnable MVP skeleton:

- Vue 3 frontend
- Node + Express API
- Monorepo-style folder structure
- Domain types
- Calculator package
- Provider abstraction
- Mock TWSE/Fugle-ready provider structure
- First vertical slice:
  - input stock symbol
  - fetch stock info
  - fetch mock warrants
  - calculate intrinsic value, premium, leverage, ABCDE scenarios
  - rank warrants
  - display recommendation + all warrants

## Quick Start

### API

```bash
cd apps/api
npm install
npm run dev
```

API runs at:

```txt
http://localhost:3000
```

### Web

Open another terminal:

```bash
cd apps/web
npm install
npm run dev
```

Web runs at:

```txt
http://localhost:5173
```

## First Test

1. Start API.
2. Start Web.
3. Enter `2330`.
4. Click Analyze.
5. You should see stock info and ranked warrants.

## Important

This version uses mock data.

Real TWSE / Fugle integration belongs to future sprints.
