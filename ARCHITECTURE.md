# 🏛️ Architecture & Technical Design

**VexStorm'26 Fraud Detection System - Technical Overview**

---

## 📊 System Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│                     (Chrome, Firefox, etc)                   │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ HTTPS/HTTP
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                           │
│                   Next.js 14 (Vercel)                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  React Components                                      │  │
│  │  • TransactionForm.tsx                                 │  │
│  │  • RiskDisplay.tsx                                     │  │
│  │  • LoadingSpinner.tsx                                  │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  API Client (lib/api.ts)                               │  │
│  │  • evaluateTransaction()                               │  │
│  │  • getFlaggedAccounts()                                │  │
│  └────────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ REST API (JSON)
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                     BACKEND LAYER                            │
│                  FastAPI (Railway/Render)                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  API Routes Layer (api/routes.py)                      │  │
│  │  POST /api/evaluate-transaction                        │  │
│  │  GET  /api/flagged-accounts                            │  │
│  │  GET  /health                                           │  │
│  └──────────────────────┬─────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Service Layer (services/fraud_detector.py)            │  │
│  │  • evaluate_transaction()                              │  │
│  │  • _calculate_risk_score()                             │  │
│  │  • _check_velocity()                                   │  │
│  │  • _determine_decision()                               │  │
│  └──────────────────────┬─────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Data Models (models/schemas.py)                       │  │
│  │  • TransactionRequest (Pydantic)                       │  │
│  │  • TransactionResponse (Pydantic)                      │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  In-Memory Storage                                     │  │
│  │  • transaction_history: Dict[str, List]                │  │
│  │  • flagged_receivers: Set[str]                         │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### Transaction Evaluation Flow

```
1. User fills form
   └─> Sender ID, Receiver ID, Amount
   
2. Frontend validates input
   └─> Amount > 0, IDs not empty
   
3. Frontend calls API
   └─> POST /api/evaluate-transaction
       Body: { amount, sender_id, receiver_id, timestamp }
   
4. Backend validates with Pydantic
   └─> Type checking, constraints
   
5. FraudDetector.evaluate_transaction()
   ├─> Check amount threshold (+40 if > $50k)
   ├─> Check flagged receiver (+50 if flagged)
   ├─> Check velocity (+15-30 based on frequency)
   ├─> Check round amount (+10 if divisible by $1000)
   └─> Check self-transfer (+25 if sender = receiver)
   
6. Calculate total risk score
   └─> Sum all points (0-100)
   
7. Determine decision
   ├─> 0-39 points  → APPROVE (low risk)
   ├─> 40-69 points → WARN (medium risk)
   └─> 70+ points   → BLOCK (high risk)
   
8. Store transaction in history
   └─> For velocity checks
   
9. Return response to frontend
   └─> { decision, reason, risk_score, risk_level, flags }
   
10. Frontend displays result
    └─> Color-coded card with details
```

---

## 🛠️ Technology Stack

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.11+ | Programming language |
| **FastAPI** | 0.109.0 | Web framework |
| **Pydantic** | 2.6.0 | Data validation |
| **Uvicorn** | 0.27.0 | ASGI server |
| **pydantic-settings** | 2.1.0 | Environment config |
| **python-dotenv** | 1.0.0 | .env file support |

**Why FastAPI?**
- ✅ Automatic API documentation (Swagger/OpenAPI)
- ✅ Built-in request/response validation
- ✅ Async support for high performance
- ✅ Type hints for better IDE support
- ✅ Production-ready with Uvicorn

---

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.1.0 | React framework |
| **React** | 18.2.0 | UI library |
| **TypeScript** | 5.3.3 | Type safety |
| **Tailwind CSS** | 3.4.1 | Styling |
| **PostCSS** | 8.4.33 | CSS processing |
| **Autoprefixer** | 10.4.17 | CSS compatibility |

**Why Next.js 14?**
- ✅ App Router for better performance
- ✅ Server-side rendering (SSR) capability
- ✅ Built-in optimization (images, fonts, scripts)
- ✅ Easy Vercel deployment
- ✅ TypeScript support out of the box

**Why Tailwind CSS?**
- ✅ Rapid prototyping for hackathons
- ✅ Consistent design system
- ✅ Small production bundle size
- ✅ Responsive design utilities
- ✅ Industry standard (judges recognize it)

---

## 🏗️ Design Patterns

### Backend Patterns

**1. Layered Architecture**
```
API Routes → Services → Models
```
- **Separation of Concerns**: Each layer has single responsibility
- **Testability**: Services can be tested independently
- **Maintainability**: Changes in one layer don't affect others

**2. Singleton Pattern**
```python
# Single fraud detector instance
fraud_detector = FraudDetector()
```
- Shares transaction history across requests
- Maintains flagged accounts list
- Improves performance (no re-initialization)

**3. Strategy Pattern (Ready for ML)**
```python
# Current: Deterministic
def evaluate_transaction(tx):
    return self._calculate_risk_score(tx)

# Future: ML-based (same interface)
def evaluate_transaction(tx):
    return self.ml_model.predict(tx)
```
- Easy to swap scoring algorithms
- No changes to API layer
- Facilitates A/B testing

**4. Builder Pattern**
```python
def _build_response(score, flags):
    # Centralized response construction
    return TransactionResponse(...)
```

---

### Frontend Patterns

**1. Component Composition**
```
Page (page.tsx)
├─> TransactionForm
├─> LoadingSpinner
└─> RiskDisplay
```

**2. Custom Hooks (Future)**
```typescript
// Potential enhancement
function useTransactionEvaluation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  // ...
}
```

**3. Controlled Components**
```typescript
// Form inputs managed by React state
<input value={formData.amount} onChange={handleChange} />
```

**4. Conditional Rendering**
```typescript
{loading && <LoadingSpinner />}
{result && <RiskDisplay result={result} />}
{error && <ErrorMessage error={error} />}
```

---

## 🔒 Security Considerations

### Current Implementation

**Input Validation**
- ✅ Pydantic models enforce types and constraints
- ✅ Frontend validates before submission
- ✅ Amount must be > 0 and < 1,000,000
- ✅ IDs must be non-empty strings

**CORS Configuration**
- ✅ Explicit allowed origins
- ✅ Environment-based (dev vs prod)
- ✅ No wildcard (*) in production

**Error Handling**
- ✅ No sensitive data in error messages
- ✅ Generic 400/500 responses
- ✅ Detailed logging server-side only

### Production Enhancements (Future)

**Authentication & Authorization**
```python
# Add JWT token verification
@router.post("/evaluate-transaction")
async def evaluate(transaction: TransactionRequest, 
                   user: User = Depends(get_current_user)):
    # ...
```

**Rate Limiting**
```python
from slowapi import Limiter
limiter = Limiter(key_func=get_remote_address)

@limiter.limit("10/minute")
@router.post("/evaluate-transaction")
```

**API Key Management**
```python
# Require API key header
async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key not in valid_keys:
        raise HTTPException(401)
```

**HTTPS Only**
- Enforce SSL/TLS in production
- HTTP Strict Transport Security (HSTS)

**Input Sanitization**
- Prevent SQL injection (when DB added)
- XSS protection on frontend
- NoSQL injection prevention

---

## 📈 Performance Considerations

### Current Performance

**Response Time**
- Local: ~50-100ms
- Production: ~200-500ms (includes network)
- Cold start: 2-5 seconds (free tier)

**Scalability**
- In-memory storage: Good for demo, limited for production
- Stateless API: Easy to horizontal scale
- No database: No bottleneck

### Production Optimizations (Future)

**Caching**
```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def get_flagged_accounts():
    # Cache flagged accounts list
```

**Database Queries**
- Index on sender_id, receiver_id
- Batch inserts for transaction history
- Read replicas for high traffic

**CDN for Frontend**
- Static assets on edge network (Vercel does this)
- Reduced latency globally

**Background Jobs**
```python
# For ML model training, pattern analysis
from celery import Celery
app = Celery('fraud_detection')

@app.task
def train_ml_model():
    # Train on historical data
```

---

## 🗄️ Data Models

### TransactionRequest
```typescript
{
  amount: number,        // Transaction amount (USD)
  sender_id: string,     // Sender identifier
  receiver_id: string,   // Receiver identifier
  timestamp: string      // ISO 8601 format
}
```

**Validation:**
- amount: > 0, < 1,000,000
- sender_id: min_length=1
- receiver_id: min_length=1
- timestamp: ISO format

---

### TransactionResponse
```typescript
{
  decision: "approve" | "warn" | "block",
  reason: string,                    // Human-readable explanation
  risk_score: number,                // 0-100
  risk_level: "low" | "medium" | "high",
  flags: string[]                    // List of risk indicators
}
```

---

### Internal Storage (Backend)

**Transaction History**
```python
{
  "sender_id": [
    {
      "timestamp": datetime,
      "amount": float,
      "receiver_id": string
    },
    ...
  ]
}
```

**Flagged Receivers**
```python
{
  "flagged_account_1",
  "flagged_account_2",
  "suspicious_merchant",
  ...
}
```

---

## 🔄 State Management

### Frontend State

**Component State (useState)**
```typescript
const [formData, setFormData] = useState<FormData>({...});
const [result, setResult] = useState<TransactionResponse | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
```

**Future: Global State (Context API or Zustand)**
```typescript
// For multi-page apps
const TransactionContext = createContext();
```

### Backend State

**Singleton Instance**
- FraudDetector maintains in-memory state
- Shared across all requests
- Persists until server restart

**Stateless API**
- No session management
- Each request independent
- Easy to scale horizontally

---

## 🚀 Deployment Architecture

### Development Environment

```
Localhost:3000 (Frontend)
     │
     ├─> Localhost:8000 (Backend)
     │
     └─> In-Memory Storage
```

### Production Environment

```
Vercel CDN (Frontend)
     │
     ├─> Railway (Backend)
     │   └─> In-Memory Storage
     │
     └─> Environment Variables
         • CORS_ORIGINS
         • NEXT_PUBLIC_API_URL
```

---

## 🔮 Future Architecture (ML Integration)

### Phase 2: ML-Enhanced System

```
Frontend
   │
   └─> API Gateway
        │
        ├─> Fraud Detection Service
        │   ├─> Rule Engine (Current)
        │   ├─> ML Model Service (New)
        │   │   ├─> XGBoost Model
        │   │   ├─> Random Forest
        │   │   └─> Neural Network
        │   └─> Ensemble Decision
        │
        ├─> Graph Analysis Service (New)
        │   └─> Neo4j / NetworkX
        │
        ├─> User Profile Service (New)
        │   └─> PostgreSQL
        │
        └─> Analytics Service (New)
            └─> Time-series DB
```

### Phase 3: Multi-Agent AI

```
Transaction Request
   │
   ├─> Agent 1: Transaction Scorer
   ├─> Agent 2: Behavior Analyzer
   ├─> Agent 3: Network Analyst
   └─> Agent 4: Intent Detector
        │
        └─> Consensus Decision
```

---

## 📊 Monitoring & Observability (Future)

**Metrics to Track**
- Request rate (req/sec)
- Response time (p50, p95, p99)
- Error rate (%)
- Decision distribution (approve/warn/block %)
- False positive rate
- False negative rate

**Logging**
- Request/response logs
- Error logs with stack traces
- Audit trail for compliance
- Model predictions (for ML phase)

**Alerting**
- Error rate spike
- Response time degradation
- Unusual decision patterns
- Service downtime

---

## ✅ Production Readiness Checklist

### Current Status

- [x] Clean code structure
- [x] Type safety (TypeScript, Pydantic)
- [x] Input validation
- [x] Error handling
- [x] CORS configuration
- [x] Environment variables
- [x] API documentation (FastAPI /docs)
- [x] Responsive UI
- [x] Loading states
- [x] Deployment configs

### For Production

- [ ] Add authentication
- [ ] Implement rate limiting
- [ ] Add database (PostgreSQL)
- [ ] Set up monitoring (Datadog, New Relic)
- [ ] Add logging (Sentry)
- [ ] Write unit tests (pytest, Jest)
- [ ] Add integration tests
- [ ] Set up CI/CD pipeline
- [ ] SSL/TLS certificates
- [ ] Backup strategy
- [ ] Disaster recovery plan
- [ ] Performance testing
- [ ] Security audit
- [ ] Compliance review (GDPR, PCI-DSS)

---

**This architecture is designed to be hackathon-ready now, and production-ready later! 🚀**
