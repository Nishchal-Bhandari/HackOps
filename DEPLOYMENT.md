# 🚀 Deployment Guide - Fraud Detection System

Complete deployment instructions for VexStorm'26 fraud detection prototype.

## 📋 Overview

This guide covers deploying:
- **Frontend**: Next.js app to Vercel
- **Backend**: FastAPI app to Railway

**Estimated Time**: 15-20 minutes

---

## 🔹 Part 1: Deploy Backend to Railway

### Prerequisites
- GitHub account
- Railway account (free tier): https://railway.app

### Step-by-Step

**1. Prepare Backend for Deployment**

Ensure your backend has these files (✅ already included):
- `Procfile` - Tells Railway how to run the app
- `requirements.txt` - Python dependencies
- `.env.example` - Environment variable template

**2. Create Railway Account**

- Visit https://railway.app
- Sign up with GitHub
- Verify your email

**3. Create New Project**

- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Authorize Railway to access your repositories
- Select your repository
- Choose **root directory** or specify `backend` folder

**4. Configure Environment Variables**

In Railway dashboard:
- Go to **Variables** tab
- Add these variables:

```
CORS_ORIGINS=http://localhost:3000
ENVIRONMENT=production
```

**Note**: We'll update `CORS_ORIGINS` after deploying frontend

**5. Deploy**

- Railway automatically detects Python
- Reads `Procfile` for start command
- Builds and deploys (takes 2-3 minutes)

**6. Get Your Backend URL**

- Click **Settings** → **Domains**
- Railway provides URL like: `https://your-app.railway.app`
- Click **"Generate Domain"** if not already created
- Copy this URL - you'll need it for frontend

**7. Verify Backend Deployment**

Test health endpoint:
```bash
curl https://your-app.railway.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "environment": "production"
}
```

Visit API docs: `https://your-app.railway.app/docs`

---

## 🔹 Part 2: Deploy Frontend to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier): https://vercel.com

### Step-by-Step

**1. Create Vercel Account**

- Visit https://vercel.com
- Sign up with GitHub
- Complete onboarding

**2. Import Project**

- Click **"Add New..."** → **"Project"**
- Import your GitHub repository
- Vercel auto-detects Next.js

**3. Configure Build Settings**

Vercel should auto-detect these (verify):
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Root Directory**: `frontend` (if monorepo)

**4. Configure Environment Variables**

Before deploying, add:
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://your-app.railway.app` (from Part 1, step 6)

Important: Use your actual Railway URL, no trailing slash

**5. Deploy**

- Click **"Deploy"**
- Vercel builds and deploys (takes 1-2 minutes)
- You'll get a URL like: `https://fraud-detection-xyz.vercel.app`

**6. Update Backend CORS**

Now that you have your Vercel URL:

**Go back to Railway:**
- Open your backend project
- Go to **Variables**
- Update `CORS_ORIGINS`:

```
CORS_ORIGINS=https://fraud-detection-xyz.vercel.app,http://localhost:3000
```

Replace with your actual Vercel URL. Keep localhost for local development.

- Save changes
- Railway will automatically redeploy

**7. Verify Full Stack Deployment**

Visit your Vercel URL and test:
1. Submit a low-risk transaction
2. Submit a high-risk transaction
3. Check browser console for errors (F12)

---

## 🔹 Part 3: Testing Production

### Test Suite

**Test 1: Low Risk (Should Approve)**
- Sender ID: `user123`
- Receiver ID: `merchant456`
- Amount: `100`

**Test 2: High Risk (Should Block)**
- Sender ID: `user001`
- Receiver ID: `flagged_account_1`
- Amount: `75000`

**Test 3: Medium Risk (Should Warn)**
- Sender ID: `user789`
- Receiver ID: `normal_user`
- Amount: `55000`

### Using curl to Test Backend Directly

```bash
curl -X POST https://your-app.railway.app/api/evaluate-transaction \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "sender_id": "user123",
    "receiver_id": "merchant456",
    "timestamp": "2026-02-15T10:30:00Z"
  }'
```

Expected response:
```json
{
  "decision": "approve",
  "reason": "Transaction approved. No significant risk indicators detected.",
  "risk_score": 0,
  "risk_level": "low",
  "flags": ["No risk indicators detected"]
}
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Error: "Failed to fetch" or Network Error**

**Cause**: Frontend can't reach backend
**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` in Vercel environment variables
2. Check Railway backend is running (health endpoint)
3. Ensure CORS_ORIGINS includes Vercel URL
4. Redeploy both services

**Error: "CORS policy blocked"**

**Cause**: Backend CORS not configured for frontend URL
**Solution**:
1. Go to Railway → Variables
2. Update `CORS_ORIGINS` to include your Vercel URL
3. Format: `https://your-app.vercel.app,http://localhost:3000`
4. Wait for Railway to redeploy (automatic)

### Backend Issues

**Error: "Application failed to respond"**

**Cause**: Backend not starting properly
**Solution**:
1. Check Railway logs: **Deployments** → Click latest deploy → **View Logs**
2. Look for Python errors
3. Verify `Procfile` exists and is correct
4. Check `requirements.txt` has all dependencies

**Error: "Module not found"**

**Cause**: Missing dependency or wrong import path
**Solution**:
1. Verify all imports use `app.` prefix (e.g., `from app.models import schemas`)
2. Check requirements.txt includes all packages
3. Redeploy after fixing

### Cold Starts

**Issue**: First request after inactivity is slow (15-30 seconds)

**This is normal** on Railway/Vercel free tiers. Subsequent requests are fast. For hackathon demos:
- "Warm up" the app before presenting (make a test request)
- Mention this is expected on free tier
- Explain production would use always-on instances

---

## 🔄 Redeploying After Changes

### Frontend (Vercel)

**Automatic**:
- Push to GitHub `main` branch
- Vercel auto-deploys

**Manual**:
- Go to Vercel dashboard → Deployments
- Click **"Redeploy"**

### Backend (Railway)

**Automatic**:
- Push to GitHub `main` branch
- Railway auto-deploys

**Manual**:
- Go to Railway dashboard → Deployments
- Click latest deployment → **"Redeploy"**

---

## 📊 Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
- Go to your project
- Click **Analytics** tab
- View visitor metrics, performance

### Railway Logs

View real-time logs:
- Railway dashboard → **Deployments**
- Click active deployment
- **View Logs** button
- See API requests, errors

---

## 💰 Cost Considerations

### Free Tier Limits

**Vercel**:
- 100GB bandwidth/month
- Unlimited deployments
- Good for hackathons

**Railway**:
- $5 free credit/month
- ~500 hours uptime
- Perfect for demos

### If You Exceed Free Tier

For hackathons, you won't exceed limits. If deployed longer:
- Railway charges $0.000463/GB-hour
- Vercel charges for overages
- Consider pausing deployments when not demoing

---

## ✅ Pre-Demo Checklist

**24 Hours Before Demo**:
- [ ] Both services deployed and verified
- [ ] Test all three risk scenarios
- [ ] Check browser console for errors
- [ ] Verify mobile responsive design
- [ ] Take screenshots for PPT

**1 Hour Before Demo**:
- [ ] "Warm up" the backend (make test request)
- [ ] Clear browser cache
- [ ] Have backup curl commands ready
- [ ] Load demo URLs in browser tabs

**During Demo**:
- [ ] Use pre-filled examples (Low/Medium/High risk buttons)
- [ ] Explain risk scoring factors
- [ ] Show API documentation (`/docs` endpoint)
- [ ] Mention ML extension path

---

## 🎯 Demo URLs to Add to PPT

```
Frontend (Live App): https://your-app.vercel.app
Backend API Docs: https://your-api.railway.app/docs
GitHub Repository: https://github.com/your-username/fraud-detection
Demo Video: [Upload to YouTube/Loom and add link]
```

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Next.js Docs**: https://nextjs.org/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com

---

**Congratulations! Your fraud detection system is now live! 🎉**

Share your deployment URLs in the hackathon submission and demo with confidence.
