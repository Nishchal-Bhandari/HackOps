# 🚀 Deployment Guide - VexStorm'26 Payment System

**Quick deployment via Web UI (5 minutes total)**

---

## 📋 Prerequisites

- ✅ GitHub repository: https://github.com/Nishchal-Bhandari/HackOps
- ✅ Vercel account (free): https://vercel.com/signup
- ✅ Railway account (free): https://railway.app/login

---

## Part 1: Deploy Backend to Railway (2 minutes)

### Step 1: Create Railway Project

1. **Go to Railway:** https://railway.app
2. **Click "Start a New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose:** `Nishchal-Bhandari/HackOps`
5. **Railway will auto-detect:** Python/FastAPI project

### Step 2: Configure Backend

1. **Add Root Directory:**
   - Click **Settings** → **General**
   - Set **Root Directory:** `backend`
   - Click **Save**

2. **Add Environment Variables:**
   - Click **Variables** tab
   - Add these variables:
     ```
     CORS_ORIGINS=*
     ENVIRONMENT=production
     ```

3. **Configure Start Command:**
   - Click **Settings** → **Deploy**
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Click **Save**

### Step 3: Deploy & Get URL

1. **Railway auto-deploys** after saving settings
2. **Wait for build** (1-2 minutes) ⏳
3. **Get your backend URL:**
   - Click **Settings** → **Networking**
   - Click **Generate Domain**
   - **Copy the URL** (e.g., `https://hackops-production.up.railway.app`)
   
✅ **Backend deployed!** Keep this URL for the next step.

---

## Part 2: Deploy Frontend to Vercel (3 minutes)

### Step 1: Create Vercel Project

1. **Go to Vercel:** https://vercel.com
2. **Click "Add New..."** → **Project**
3. **Import Git Repository:**
   - Select `Nishchal-Bhandari/HackOps`
   - Click **Import**

### Step 2: Configure Build Settings

1. **Framework Preset:** Next.js (auto-detected ✓)
2. **Root Directory:** 
   - Click **Edit** next to Root Directory
   - Enter: `frontend`
   - Click **Continue**

3. **Environment Variables:**
   - Click **Add** under Environment Variables
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://YOUR-RAILWAY-URL.railway.app/api` 
     *(Replace with your Railway URL from Part 1)*
   - Click **Add**

### Step 3: Deploy

1. **Click "Deploy"** 🚀
2. **Wait for build** (2-3 minutes) ⏳
3. **Vercel assigns URL** (e.g., `https://hack-ops-xyz.vercel.app`)

✅ **Frontend deployed!**

---

## Part 3: Update Backend CORS (1 minute)

### Allow Frontend to Call Backend

1. **Go back to Railway** → Your backend project
2. **Click Variables**
3. **Update CORS_ORIGINS:**
   - Change from: `*`
   - To: `https://your-vercel-app.vercel.app`
   *(Use your actual Vercel URL)*
4. **Click Save** (auto-redeploys)

---

## 🎯 Verification

### Test Your Deployed App

1. **Visit your Vercel URL:** `https://your-app.vercel.app`
2. **Click "Low Risk Example"**
3. **Click "Continue to Review →"**
4. **Click "Confirm Payment"**
5. **See success screen!** ✅

If it works → **Deployment complete!** 🎉

---

## 🔗 Your Final URLs

**📱 Frontend (Vercel):**
```
https://your-app-name.vercel.app
```

**🔌 Backend API (Railway):**
```
https://your-backend.railway.app
```

**📖 API Documentation:**
```
https://your-backend.railway.app/docs
```

---

## 🐛 Troubleshooting

### Frontend shows "Connection Error"
- ✅ Check Railway backend is running (green status)
- ✅ Verify `NEXT_PUBLIC_API_URL` in Vercel settings
- ✅ Ensure CORS_ORIGINS includes your Vercel URL

### Backend build fails
- ✅ Check Root Directory is set to `backend`
- ✅ Verify `requirements.txt` exists
- ✅ Check Railway build logs for errors

### 500 Internal Server Error
- ✅ Check Railway logs: Click **Deployments** → **View Logs**
- ✅ Verify all environment variables are set

---

## 📊 Free Tier Limits

**Vercel Free:**
- ✅ 100 deployments/month
- ✅ 100GB bandwidth
- ✅ Perfect for hackathons!

**Railway Free:**
- ✅ $5 free credits/month
- ✅ ~500 hours runtime
- ✅ Enough for demo + judging

---

## 🎓 For VexStorm'26 Submission

**Include these links in your submission:**

1. **Live Demo:** `https://your-vercel-app.vercel.app`
2. **API Docs:** `https://your-railway-app.railway.app/docs`
3. **GitHub:** `https://github.com/Nishchal-Bhandari/HackOps`

---

## 💡 Pro Tips

1. **Custom Domain:** Add your own domain in Vercel settings
2. **Analytics:** Enable Vercel Analytics for free
3. **Monitoring:** Check Railway metrics for API performance
4. **SSL:** Both platforms provide free HTTPS automatically

---

**Need help?** Check deployment logs:
- **Vercel:** Click deployment → View Function Logs
- **Railway:** Click deployment → View Logs

Good luck with VexStorm'26! 🚀
