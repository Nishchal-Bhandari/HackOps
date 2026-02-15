# Fraud Detection System - Frontend

Next.js 14 web application for real-time transaction fraud detection.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see [../backend/README.md](../backend/README.md))

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment variables**

```bash
# Copy example environment file
cp .env.local.example .env.local

# Edit .env.local to set your backend API URL
# Default: NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page with transaction form
│   │   └── globals.css         # Global styles with Tailwind
│   ├── components/
│   │   ├── TransactionForm.tsx # Input form component
│   │   ├── RiskDisplay.tsx     # Results display component
│   │   └── LoadingSpinner.tsx  # Loading state component
│   ├── lib/
│   │   └── api.ts              # API client functions
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 Features

### Transaction Form
- Input fields: Sender ID, Receiver ID, Amount
- Pre-filled example scenarios (Low/Medium/High risk)
- Real-time validation
- Loading states during API calls

### Risk Display
- Color-coded decision badges (Green/Yellow/Red)
- Risk score visualization with progress bar
- Detailed risk flags and explanations
- Human-readable decision reasoning

### User Experience
- Responsive design (mobile & desktop)
- Smooth animations and transitions
- Error handling with user-friendly messages
- Professional gradient UI with glass-morphism effects

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState)
- **API Client**: Native Fetch API

## 🧪 Testing the Application

### Test Scenarios

**1. Low Risk Transaction (Approved)**
- Sender ID: `user123`
- Receiver ID: `merchant456`
- Amount: `$500`
- Expected: ✓ Approved (Low Risk)

**2. Medium Risk Transaction (Warning)**
- Sender ID: `user789`
- Receiver ID: `vendor_xyz`
- Amount: `$55,000`
- Expected: ⚠ Warning (Medium Risk)

**3. High Risk Transaction (Blocked)**
- Sender ID: `account_001`
- Receiver ID: `flagged_account_1`
- Amount: `$75,000`
- Expected: ✕ Blocked (High Risk)

### Verify Backend Connection

The app will display an error message if it cannot connect to the backend API. Ensure:

1. Backend is running on `http://localhost:8000`
2. CORS is properly configured in backend
3. Environment variable `NEXT_PUBLIC_API_URL` is set correctly

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🚢 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via GitHub Integration

1. Push code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

6. Add environment variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend-api.railway.app`

7. Click "Deploy"

### Post-Deployment

1. Get your Vercel deployment URL (e.g., `https://fraud-detection.vercel.app`)
2. Update backend `CORS_ORIGINS` environment variable to include your Vercel URL
3. Test the live application

## 🔧 Development Tips

### Hot Reload
The development server supports hot reloading. Changes to components will reflect immediately.

### TypeScript
Enable strict type checking for better code quality:
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Tailwind Intellisense
Install the "Tailwind CSS IntelliSense" VS Code extension for autocomplete.

## 🐛 Troubleshooting

**Error: "Failed to fetch"**
- Backend is not running or wrong URL in `.env.local`
- Check browser console for detailed error
- Verify `NEXT_PUBLIC_API_URL` is set correctly

**Error: "CORS policy blocked"**
- Backend CORS configuration doesn't include frontend URL
- Update `CORS_ORIGINS` in backend `.env` file

**Styles not loading**
- Run `npm install` again to ensure Tailwind is installed
- Restart development server

**Build errors**
- Clear `.next` folder: `rm -rf .next` (macOS/Linux) or `rmdir /s .next` (Windows)
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## 📚 API Integration

The frontend communicates with the backend via REST API:

```typescript
// lib/api.ts
export async function evaluateTransaction(data: TransactionData) {
  const response = await fetch(`${API_URL}/api/evaluate-transaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
```

## 🎯 Next Steps for Round 2

- Integrate ML models for smarter fraud detection
- Add transaction history dashboard
- Implement user authentication
- Add graph visualization for relationship analysis
- Real-time notifications for high-risk transactions
- Multi-agent AI collaboration features

---

**VexStorm'26 - Making FinTech Safer**
