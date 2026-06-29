# WarrantLab AI Agent Instructions

## Project Goal

WarrantLab is a Decision Engine.

It is NOT:

- a market information website
- a warrant quote website

Its purpose is to help users choose the best warrant.

---

## Architecture Principles

- Frontend never performs financial calculations.
- Calculator is independent from UI.
- Providers are replaceable.
- The application must not depend on a single data source.

---

## Data Providers

Current:

- TWSE
- Fugle

Future:

- Broker APIs

---

## Development Rules

Always follow the documents inside `/docs`.

Do not redesign the architecture unless requested.

Keep the code clean and modular.

Always explain major implementation decisions.
