# API

Base URL for local development:

```txt
http://localhost:3000
```

## Health

GET `/api/health`

Response:

```json
{
  "ok": true
}
```

## Stock

GET `/api/v1/stocks/:symbol`

Example:

GET `/api/v1/stocks/2330`

Response:

```json
{
  "symbol": "2330",
  "name": "台積電",
  "price": 1095,
  "source": "MOCK"
}
```

## Warrants

GET `/api/v1/warrants/:symbol`

Example:

GET `/api/v1/warrants/2330`

Response:

```json
{
  "underlying": "2330",
  "count": 2,
  "data": [
    {
      "warrant": {},
      "analysis": {},
      "score": 88.2,
      "reason": "High scenario return"
    }
  ]
}
```
