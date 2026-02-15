# Fraud Detection API - Backend

FastAPI-based fraud detection service for real-time transaction risk evaluation.

## 🚀 Quick Start

### Prerequisites

- Python 3.11 or higher
- pip (Python package manager)

### Installation

1. **Create virtual environment**

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

2. **Install dependencies**

```bash
pip install -r requirements.txt
```

3. **Configure environment variables**

```bash
# Copy example environment file
cp .env.example .env

# Edit .env if needed (default values work for local development)
```

### Running Locally

```bash
# Start the development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API Base**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## 📡 API Endpoints

### POST `/api/evaluate-transaction`

Evaluate a transaction for fraud risk.

**Request Body:**
```json
{
  "amount": 15000.00,
  "sender_id": "user123",
  "receiver_id": "merchant456",
  "timestamp": "2026-02-15T10:30:00Z"
}
```

**Response:**
```json
{
  "decision": "warn",
  "reason": "Transaction flagged for manual review. Moderate risk indicators present.",
  "risk_score": 40,
  "risk_level": "medium",
  "flags": [
    "High transaction amount ($15,000.00)"
  ]
}
```

**Decision Values:**
- `approve`: Low risk, transaction approved
- `warn`: Medium risk, manual review recommended
- `block`: High risk, transaction blocked

### GET `/api/flagged-accounts`

Get list of accounts currently flagged as high-risk.

**Response:**
```json
{
  "flagged_accounts": ["flagged_account_1", "flagged_account_2"],
  "count": 2
}
```

### GET `/health`

Health check endpoint for monitoring.

## 🧪 Testing with curl

**Low Risk Transaction:**
```bash
curl -X POST http://localhost:8000/api/evaluate-transaction \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.00,
    "sender_id": "user123",
    "receiver_id": "merchant456",
    "timestamp": "2026-02-15T10:30:00Z"
  }'
```

**High Risk Transaction:**
```bash
curl -X POST http://localhost:8000/api/evaluate-transaction \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 75000.00,
    "sender_id": "user123",
    "receiver_id": "flagged_account_1",
    "timestamp": "2026-02-15T10:30:00Z"
  }'
```

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app initialization
│   ├── config.py            # Environment configuration
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py       # Pydantic request/response models
│   ├── services/
│   │   ├── __init__.py
│   │   └── fraud_detector.py # Core fraud detection logic
│   └── api/
│       ├── __init__.py
│       └── routes.py        # API endpoint definitions
├── requirements.txt
├── .env.example
├── Procfile
└── README.md
```

## 🔍 Fraud Detection Logic

The system evaluates transactions based on multiple risk factors:

1. **Amount Threshold** (+40 points): Transactions > $50,000
2. **Flagged Accounts** (+50 points): Receiver in flagged database
3. **Velocity Check** (+30 points): 3+ transactions in 1 hour
4. **Round Amounts** (+10 points): Exactly divisible by $1,000
5. **Self-Transfer** (+25 points): Sender = Receiver

**Risk Scoring:**
- **0-39 points**: Low risk → Approve
- **40-69 points**: Medium risk → Warn (manual review)
- **70+ points**: High risk → Block

## 🚢 Deployment to Railway

1. **Create Railway account**: https://railway.app

2. **Create new project**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select this repository
   - Choose `backend` folder

3. **Configure environment variables**:
   ```
   CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
   ENVIRONMENT=production
   ```

4. **Railway auto-detects**:
   - Python runtime
   - Runs command from `Procfile`
   - Assigns public URL

5. **Verify deployment**:
   ```bash
   curl https://your-api.railway.app/health
   ```

## 🔧 Development

**Run tests:**
```bash
python -m pytest tests/  # (if tests are added)
```

**Code formatting:**
```bash
pip install black
black app/
```

**Type checking:**
```bash
pip install mypy
mypy app/
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CORS_ORIGINS` | Comma-separated allowed origins | `http://localhost:3000` |
| `ENVIRONMENT` | Runtime environment | `development` |

## 🛠️ Extending to ML Models

The fraud detector service is designed for easy ML integration:

```python
# Current: Deterministic scoring
def evaluate_transaction(self, transaction):
    score = self._calculate_risk_score(transaction)
    
# Future: ML-based scoring
def evaluate_transaction(self, transaction):
    features = self._extract_features(transaction)
    score = self.ml_model.predict(features)
```

Features can be extracted from transaction history and passed to models like:
- XGBoost for gradient boosting
- Random Forest for ensemble learning
- Neural networks for deep pattern recognition
- Graph networks for relationship analysis

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Railway Deployment Guide](https://docs.railway.app/)

---

**VexStorm'26 - Capital-Core Track: Fraud Detection & Personalized Financial Advisory**
