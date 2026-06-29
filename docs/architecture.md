# Architecture

## Layers

Frontend Vue

↓

Backend API Node

↓

Provider Layer

↓

Calculator Engine

↓

Ranking Engine

## Rule

Each layer has one responsibility.

## Frontend

Responsible for:
- input
- display
- mode switching
- favorites later

Not responsible for:
- intrinsic value
- premium
- leverage
- ranking

## Backend API

Responsible for:
- routes
- provider selection
- composing calculator output
- returning normalized responses

## Providers

All market data sources are providers.

Current:
- Mock Provider

Planned:
- TWSE Provider
- Fugle Provider
- Broker Provider

## Calculator

Responsible for all formulas.

## Ranking

Responsible for explainable score.
