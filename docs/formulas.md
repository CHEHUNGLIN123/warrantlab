# Financial Formulas

## Intrinsic Value

For call warrants:

```txt
max((Underlying Price - Strike Price) × Exercise Ratio, 0)
```

## Time Value

```txt
max(Warrant Price - Intrinsic Value, 0)
```

## Premium

In this project, premium means how much of warrant price is time value:

```txt
Time Value / Warrant Price
```

## Scenario ABCDE

Default scenarios:

| Scenario | Underlying Change |
|---|---:|
| A | -10% |
| B | 0% |
| C | +10% |
| D | +20% |
| E | +30% |

Scenario return:

```txt
(New Intrinsic Value - Current Warrant Price) / Current Warrant Price
```

## Leverage

Initial MVP simplified leverage:

```txt
Scenario C Return / Underlying C Return
```

This can be improved later using real delta/gamma estimates.
