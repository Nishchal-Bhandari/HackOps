# 🎬 Demo Script - 30-Second Video Walkthrough

Complete script for recording your hackathon demo video.

---

## 🎯 Demo Strategy

**Goal**: Show the fraud detection system in action with 3 different risk scenarios in 30 seconds.

**Target Audience**: Hackathon judges evaluating feasibility, technical depth, and UX.

---

## 📝 Script (30 Seconds)

### **[0-5s] Introduction & Low Risk**
**Visual**: Show homepage with form filled
**Action**: Click "Low Risk Example" button
**Narration**: 
> "Our fraud detection system evaluates transactions in real-time. Let's start with a low-risk transaction - $500 to a verified merchant."

**Click**: "Evaluate Transaction"
**Result**: Shows green **APPROVE** with risk score 0/100

---

### **[5-12s] Medium Risk Warning**
**Visual**: Click "Evaluate Another Transaction"
**Action**: Click "Medium Risk Example" button (auto-fills $55,000)
**Narration**:
> "For high-value transfers over $50,000, the system flags for manual review."

**Click**: "Evaluate Transaction"
**Result**: Shows yellow **WARN** with risk score ~40, flags shown

---

### **[12-22s] High Risk Blocked**
**Visual**: Click "Evaluate Another Transaction"
**Action**: Click "High Risk Example" button (flagged receiver)
**Narration**:
> "When multiple red flags appear - like flagged accounts and suspicious amounts - the transaction is blocked instantly."

**Click**: "Evaluate Transaction"
**Result**: Shows red **BLOCK** with risk score 90+, multiple flags listed

---

### **[22-28s] Technical Architecture**
**Visual**: Quickly show API docs page (`/docs` endpoint) or code structure
**Narration**:
> "Built with FastAPI and Next.js, this production-ready prototype uses deterministic risk scoring that's easily extensible to ML models."

---

### **[28-30s] Closing**
**Visual**: Return to main page or show GitHub repo
**Narration**:
> "Thank you! Full code and deployment instructions are on our GitHub."

**Text Overlay**: 
```
🔗 Live Demo: fraud-detection.vercel.app
📁 GitHub: github.com/your-username/fraud-detection
```

---

## 🎥 Recording Tips

### Tools
- **Screen Recording**: 
  - Windows: Xbox Game Bar (Win + G) or OBS Studio
  - Mac: QuickTime or ScreenFlow
  - Cross-platform: Loom (loom.com) - **RECOMMENDED**

- **Video Editing**: 
  - Simple: Loom (built-in editing)
  - Advanced: DaVinci Resolve (free), Adobe Premiere

### Settings
- **Resolution**: 1920x1080 (1080p)
- **Frame Rate**: 30fps minimum, 60fps preferred
- **Audio**: Clear mic, no background noise
- **Browser**: Full screen or hide bookmarks bar

### Before Recording

**Prepare Browser**:
1. Clear cache and cookies
2. Zoom to 100% (Ctrl/Cmd + 0)
3. Hide browser extensions (Ctrl/Cmd + Shift + N for Incognito)
4. Open only demo tabs
5. "Warm up" backend (make test request to avoid cold start)

**Prepare Script**:
1. Practice narration 2-3 times
2. Use teleprompter app or notes on second monitor
3. Speak clearly and confidently
4. Smile! (it affects your tone)

### During Recording

**Do**:
- ✅ Speak at moderate pace (not too fast)
- ✅ Emphasize key features ("real-time", "ML-ready", "production-quality")
- ✅ Show smooth mouse movements (no erratic clicking)
- ✅ Keep cursor visible on important elements
- ✅ Use example buttons for quick demos

**Don't**:
- ❌ Manually type (use pre-filled examples)
- ❌ Wait for loading spinners (warm up backend first)
- ❌ Show errors or bugs
- ❌ Ramble or go off-script
- ❌ Show personal info (bookmarks, emails, etc.)

### After Recording

**Edit**:
1. Trim dead air at start/end
2. Add title card (0-2s): "Fraud Detection System - VexStorm'26"
3. Add text overlays for URLs at end
4. Add background music (optional, keep volume low)
5. Check audio levels (consistent volume)

**Export**:
- Format: MP4 (H.264)
- Quality: High (8-10 Mbps)
- Max file size: 50MB (most hackathon platforms)
- Length: 30 seconds ±2s

---

## 🎬 Alternative: Longer Demo (2 Minutes)

If hackathon allows longer videos:

### Extended Script

**[0-15s] Introduction**
- Show homepage
- Brief overview of problem statement
- Explain Capital-Core track relevance

**[15-45s] Feature Walkthrough**
- Demonstrate all three risk levels
- Explain risk scoring factors
- Show velocity check (rapid transactions)

**[45-75s] Technical Deep Dive**
- Show API documentation (`/docs`)
- Quick code walkthrough (VS Code)
- Explain architecture (FastAPI + Next.js)
- Mention deployment (Vercel + Railway)

**[75-105s] Future Vision**
- Explain ML extension path
- Discuss graph fraud detection
- Multi-agent AI collaboration
- Intent detection features

**[105-120s] Closing**
- Team intro (optional)
- Call to action (GitHub, live demo)
- Thank you

---

## 📊 Video Checklist

**Pre-Recording**:
- [ ] Backend deployed and warmed up
- [ ] Frontend deployed and tested
- [ ] Browser prepared (incognito, full screen)
- [ ] Script practiced 2-3 times
- [ ] Recording software tested
- [ ] Microphone levels checked
- [ ] Quiet environment

**During Recording**:
- [ ] Clear narration
- [ ] Smooth mouse movements
- [ ] All three risk scenarios shown
- [ ] Results clearly visible
- [ ] No errors or bugs
- [ ] Within time limit (30s ±2s)

**Post-Recording**:
- [ ] Trimmed and edited
- [ ] Title card added
- [ ] URLs overlaid at end
- [ ] Audio levels normalized
- [ ] Exported as MP4
- [ ] File size under 50MB
- [ ] Uploaded to platform (YouTube/Loom)

---

## 🎤 Sample Narration Scripts

### Option 1: Problem-Focused
> "Financial fraud costs billions annually. Our system detects suspicious transactions in real-time. Low-risk transfers are approved instantly, while flagged accounts trigger immediate blocks. Built on FastAPI and Next.js, it's production-ready and ML-extensible. Thank you!"

### Option 2: Technical-Focused
> "This fraud detection prototype evaluates transactions using multi-factor risk scoring. Amount thresholds, receiver flagging, and velocity checks combine to generate risk scores. The architecture separates business logic from API routes, making ML model integration seamless. All deployed on Vercel and Railway."

### Option 3: Impact-Focused
> "Every second counts in fraud prevention. Our system makes approve, warn, or block decisions in milliseconds, protecting users from financial loss. With real-time analysis and explainable AI concepts, financial institutions can trust and audit every decision."

Choose based on hackathon judging criteria (technical depth vs. impact vs. innovation).

---

## 🎨 Visual Enhancements (Optional)

### Add Annotations
- Arrow pointing to risk score
- Highlight changing decision colors
- Circle around flagged account examples

### Add Transitions
- Fade between scenarios
- Zoom in on results
- Smooth cursor highlights

### Add Music
- Royalty-free: Epidemic Sound, Artlist, YouTube Audio Library
- Volume: -20dB to -15dB (quiet background)
- Genre: Upbeat tech/corporate

**Warning**: Keep it simple. Over-editing can look unprofessional.

---

## 📤 Where to Upload

### Loom (Recommended)
- **Pros**: Easy, shareable link, auto-transcription
- **Cons**: Branding on free tier
- **URL**: loom.com

### YouTube
- **Pros**: Reliable, high quality, no branding
- **Cons**: Need Google account, public/unlisted only
- **Settings**: Upload as "Unlisted" for privacy

### Vimeo
- **Pros**: Professional, customizable player
- **Cons**: Upload limits on free tier

### Google Drive
- **Pros**: Easy sharing, no account needed for viewers
- **Cons**: Preview quality can be lower

**Best Practice**: Upload to YouTube (unlisted) + Google Drive (backup)

---

## 🏆 Demo Success Metrics

**Great Demo Includes**:
- ✅ Clear problem statement
- ✅ Visible working product
- ✅ Multiple use cases shown
- ✅ Technical credibility (mentions stack, deployment)
- ✅ Professional presentation
- ✅ Within time limit
- ✅ Accessible URL in description

**Avoid**:
- ❌ Reading long text from slides
- ❌ Showing static mockups (show live app!)
- ❌ Apologizing for bugs
- ❌ Going over time limit
- ❌ Poor audio quality

---

## 🎯 Hackathon-Specific Tips

### VexStorm'26 Capital-Core Track

Judges are looking for:
1. **Feasibility**: Can this be built? (YES - you built it!)
2. **Technical Depth**: Production patterns? (YES - FastAPI, Next.js, deployment)
3. **Innovation**: Novel approach? (Deterministic → ML path, velocity checks)
4. **Impact**: Solves real problem? (Fraud costs billions, real-time prevention)

**Emphasize**:
- "Production-ready prototype"
- "ML-extensible architecture"
- "Real-time fraud prevention"
- "Multi-factor risk scoring"

---

**Ready to record? Follow this script and create a winning demo! 🎬**

Good luck with VexStorm'26! 🚀
