## API Endpoints

- POST `/api/risk/evaluate`
  - Body: `{ salary: number, savings: number }`
  - Rule: Savings should be at least 20% of salary
  - Response: `{ salary, savings, requiredSavings, ratioPercent, inRisk, shortfall, message }`

- GET `/api/investments/suggestions`
  - Response: `{ asOf, baseCurrency, suggestions: Array<{ id, name, riskLevel, horizon, trend, weight, rationale }>} )`

## Sequence Diagram

```text
User (Dashboard)
    |
    | click Evaluate Risk
    v
Frontend -> Backend: POST /api/risk/evaluate { salary, savings }
Backend --> Frontend: { inRisk, requiredSavings, shortfall, message }
    |
    | click Refresh Suggestions
    v
Frontend -> Backend: GET /api/investments/suggestions
Backend --> Frontend: { suggestions[] }
```

## Config

- Frontend reads `VITE_BACKEND_URL` for API base. Defaults to `http://localhost:5000`.


