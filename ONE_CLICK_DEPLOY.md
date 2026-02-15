[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNishchal-Bhandari%2FHackOps&root-directory=frontend&env=NEXT_PUBLIC_API_URL&envDescription=Backend%20API%20URL&envLink=https%3A%2F%2Fgithub.com%2FNishchal-Bhandari%2FHackOps%2Fblob%2Fmain%2FDEPLOYMENT_GUIDE.md&project-name=hackops-payment-system&repo-name=hackops-payment-system)

# One-Click Deployment Buttons

## Frontend to Vercel (Click Below)

👆 **Click the "Deploy with Vercel" button above**

This will:
- ✅ Auto-import from your GitHub
- ✅ Set root directory to `frontend`
- ✅ Detect Next.js automatically
- ✅ Prompt for `NEXT_PUBLIC_API_URL` environment variable

**Steps after clicking:**
1. Login to Vercel with GitHub
2. It will ask for `NEXT_PUBLIC_API_URL` - enter: `https://your-backend-url.up.railway.app/api`
3. Click Deploy
4. Done in 2 minutes!

---

## Backend to Railway (Click Below)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/Z6n3gv?referralCode=alphasec)

**Steps after clicking:**
1. Login to Railway with GitHub
2. Click "Deploy Now"
3. Railway auto-detects Python app
4. Set Root Directory: `backend`
5. Add environment variables:
   - `CORS_ORIGINS=*`
   - `ENVIRONMENT=production`
6. Deploy!
7. Generate domain in Settings → Networking

---

## Alternative: Backend to Render (Even Easier!)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

**After clicking:**
1. Select "Web Service"
2. Connect `Nishchal-Bhandari/HackOps`
3. Name: `hackops-backend`
4. Root Directory: `backend`
5. Build Command: `pip install -r requirements.txt`
6. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Deploy!

---

## 🎯 Complete Deployment Flow

### Step 1: Deploy Backend (Choose one)
- **Railway:** Click button above → Deploy → Copy URL
- **Render:** Click button above → Configure → Deploy → Copy URL

### Step 2: Deploy Frontend
- Click Vercel button above
- Paste backend URL when prompted
- Deploy!

### Step 3: Test
Visit your Vercel URL and try a payment!

---

## 📋 Repository Info

- **GitHub:** https://github.com/Nishchal-Bhandari/HackOps
- **Branch:** main
- **Frontend Path:** `frontend/`
- **Backend Path:** `backend/`

---

**Total Time:** 5 minutes to deploy both! 🚀
