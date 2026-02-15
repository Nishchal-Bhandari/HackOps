# 🚀 QUICK SETUP GUIDE

**Get your fraud detection system running in 5 minutes!**

---

## ⚡ Fast Track Setup (Local Development)

### Step 1: Backend Setup (2 minutes)

```powershell
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Start backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ **Backend running at**: http://localhost:8000
✅ **API Docs**: http://localhost:8000/docs

---

### Step 2: Frontend Setup (2 minutes)

**Open a NEW terminal window:**

```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
copy .env.local.example .env.local

# Start frontend
npm run dev
```

✅ **Frontend running at**: http://localhost:3000

---

### Step 3: Test It! (1 minute)

1. Open http://localhost:3000 in your browser
2. Click **"Low Risk Example"** button
3. Click **"Evaluate Transaction"**
4. Should see green **APPROVE** result ✅

**Test other scenarios:**
- Click **"Medium Risk Example"** → Should see yellow **WARN** ⚠️
- Click **"High Risk Example"** → Should see red **BLOCK** ❌

---

## 🧪 Run Backend Tests

```powershell
cd backend
python test_api.py
```

---

## 🐛 Troubleshooting

### Backend won't start

**Error: "python not found"**
```powershell
# Try python3 instead
python3 -m venv venv
```

**Error: "uvicorn not found"**
```powershell
# Make sure venv is activated and reinstall
pip install -r requirements.txt
```

**Error: "port 8000 already in use"**
```powershell
# Use different port
uvicorn app.main:app --reload --port 8001
# Update frontend .env.local to NEXT_PUBLIC_API_URL=http://localhost:8001
```

---

### Frontend won't start

**Error: "npm not found"**
- Install Node.js from: https://nodejs.org (version 18+)

**Error: "Failed to fetch"**
- Backend is not running
- Check http://localhost:8000/health in browser
- Verify NEXT_PUBLIC_API_URL in .env.local

**Error: "CORS policy blocked"**
- Check backend CORS_ORIGINS includes http://localhost:3000

---

## 📦 Deployment (15 minutes)

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

**Quick version:**

1. **Deploy Backend to Railway:**
   - Sign up at https://railway.app
   - New Project → Deploy from GitHub → Select repo
   - Add env vars: `CORS_ORIGINS`, `ENVIRONMENT`
   - Get Railway URL

2. **Deploy Frontend to Vercel:**
   - Sign up at https://vercel.com
   - New Project → Import from GitHub
   - Add env var: `NEXT_PUBLIC_API_URL` (Railway URL)
   - Deploy

3. **Update Backend CORS:**
   - In Railway, update `CORS_ORIGINS` with Vercel URL

---

## 📁 Project Structure

```
DataVex/
├── backend/                  ← FastAPI Backend
│   ├── app/
│   │   ├── main.py          ← Start here
│   │   ├── models/schemas.py
│   │   ├── services/fraud_detector.py  ← Core logic
│   │   └── api/routes.py
│   ├── requirements.txt
│   ├── test_api.py          ← Run tests
│   └── README.md
│
├── frontend/                 ← Next.js Frontend
│   ├── src/
│   │   ├── app/page.tsx     ← Main page
│   │   ├── components/      ← UI components
│   │   └── lib/api.ts       ← API client
│   ├── package.json
│   └── README.md
│
├── README.md                 ← Project overview
├── DEPLOYMENT.md             ← Deployment guide
├── DEMO_SCRIPT.md            ← Video demo script
└── QUICK_START.md            ← This file
```

---

## 🎯 Next Steps

**For Local Development:**
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Test all three risk scenarios
- [ ] Check browser console (F12) for errors

**For Hackathon Demo:**
- [ ] Deploy backend to Railway
- [ ] Deploy frontend to Vercel
- [ ] Test production URLs
- [ ] Record demo video (see DEMO_SCRIPT.md)
- [ ] Update PPT with live links

**For Improving:**
- [ ] Read backend/README.md for fraud logic details
- [ ] Read frontend/README.md for UI customization
- [ ] Explore API docs at /docs endpoint
- [ ] Add your own risk factors

---

## 💡 Quick Tips

**Want to customize fraud rules?**
- Edit `backend/app/services/fraud_detector.py`
- Adjust thresholds in `_determine_decision()` method

**Want to add more flagged accounts?**
- Edit `self.flagged_receivers` set in `fraud_detector.py`

**Want to change UI colors?**
- Edit `frontend/tailwind.config.js`
- Modify component styles in `frontend/src/components/`

**Want to test with different data?**
- Use frontend example buttons
- Or modify `backend/test_api.py` and run it

---

## 📞 Need Help?

1. Check error messages in terminal
2. Read detailed READMEs:
   - [Backend README](backend/README.md)
   - [Frontend README](frontend/README.md)
   - [Deployment Guide](DEPLOYMENT.md)
3. Check browser console (F12) for frontend errors
4. Verify both services are running

---

## ✅ Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can submit transactions
- [ ] See results displayed
- [ ] API docs accessible at /docs
- [ ] All three examples work (Low/Medium/High)
- [ ] No CORS errors in browser console

---

**You're all set! Start building amazing fraud detection features! 🎉**

**VexStorm'26 - Good Luck! 🚀**
