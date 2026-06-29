# WarrantLab Architecture

## Core Principle

WarrantLab is a Decision Engine.

The architecture is designed to keep business logic independent from data providers and the user interface.

---

## System Architecture

Frontend (Vue)

↓

Backend API (Node.js)

↓

Provider Layer

↓

Calculator Engine

↓

Ranking Engine

---

## Provider Layer

Supported providers:

- TWSE
- Fugle

Future providers:

- Broker APIs

The frontend must never know which provider is used.

---

## Calculator Layer

Responsible for:

- Intrinsic Value
- Premium
- Leverage
- ABCDE Scenario

No UI code is allowed here.

---

## Ranking Layer

Responsible for selecting the best warrant.

Ranking logic must be transparent and explainable.

---

## Frontend

Frontend responsibilities:

- Search
- Display results
- Show recommendation

Frontend must not perform financial calculations.
