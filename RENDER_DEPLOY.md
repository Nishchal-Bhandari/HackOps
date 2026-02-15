# Alternative: Deploy Backend to Render (if Railway fails)

## Quick Deploy to Render (Free Tier)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Deploy Backend

1. **Click "New +"** → **Web Service**
2. **Connect Repository:** Select `Nishchal-Bhandari/HackOps`
3. **Configure:**
   - **Name:** `hackops-backend`
   - **Region:** Oregon (US West)
   - **Root Directory:** `backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables:**
   - Click **Environment** tab
   - Add:
     ```
     CORS_ORIGINS=*
     ENVIRONMENT=production
     ```

5. **Click "Create Web Service"**

### Step 3: Wait for Deploy (2-3 minutes)

Render will:
- ✅ Build your Docker container
- ✅ Install dependencies
- ✅ Start the server

### Step 4: Get Your URL

After deployment completes:
- Your backend URL will be: `https://hackops-backend.onrender.com`
- API docs at: `https://hackops-backend.onrender.com/docs`

### Step 5: Update Frontend

Use this backend URL in your Vercel environment variables:
```
NEXT_PUBLIC_API_URL=https://hackops-backend.onrender.com/api
```

---

## ⚠️ Render Free Tier Notes

- **Spins down after 15 min of inactivity**
- **First request after sleep takes 30-60 seconds** (cold start)
- **Perfect for demos and hackathons!**
- **No credit card required**

---

## 🚀 Both Deployed? Update CORS

Once you have both URLs, update backend CORS on Render:

1. Go to your Render service → **Environment**
2. Update `CORS_ORIGINS`:
   ```
   https://your-vercel-app.vercel.app
   ```
3. Click **Save Changes** (auto-redeploys)

---

**Render vs Railway:**
- ✅ Render: Simpler, more reliable, free tier
- ⚠️ Render: Cold starts after inactivity
- ✅ Railway: Faster, no cold starts
- ⚠️ Railway: Sometimes tricky to configure
