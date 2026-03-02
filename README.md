# MediMind 🧠 — AI Health Assistant
### Live at: medimind.vercel.app

> Saving lives by giving everyone access to intelligent health guidance.
> Not a replacement for doctors — a consultation for the 80% of cases that don't need one.

⚠️ **Medical Disclaimer:** MediMind provides AI-powered health information for educational purposes only. It is NOT a substitute for professional medical diagnosis, advice, or treatment. Always consult a qualified healthcare provider. In emergencies, call 911.

---

## 🚀 Deploy to Vercel (10 minutes)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "MediMind v1"

# Create repo at github.com, then:
git remote add origin https://github.com/YOURNAME/medimind.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to **vercel.com** → Sign up with GitHub
2. Click **Add New Project** → Import your `medimind` repo
3. Leave all settings as default (Vercel auto-detects everything)
4. Add Environment Variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (from console.anthropic.com)
5. Click **Deploy**

✅ Your app is live at `https://medimind.vercel.app`

### Step 3 — Claim your URL
In Vercel dashboard → Settings → Domains → add `medimind` as your project name to get `medimind.vercel.app`

---

## 📁 Project Structure

```
medimind/
├── vercel.json          # Vercel routing config
├── package.json
├── .gitignore
├── api/                 # Serverless functions (backend)
│   ├── _helpers.js      # Shared Claude + FDA helpers
│   ├── symptom.js       # Symptom checker endpoint
│   ├── drugs.js         # Drug interaction checker
│   ├── report.js        # Medical report explainer
│   ├── patterns.js      # Health pattern analysis
│   └── outbreak.js      # Outbreak personalized advice
└── public/
    └── index.html       # Full frontend app
```

## 🌟 Features
- 🔍 **Symptom Checker** — Conversational AI triage personalized to your health profile
- 💊 **Drug Interaction** — Real FDA data + Claude AI analysis
- 📄 **Report Explainer** — Any lab result in plain English
- 📈 **Health Tracker** — Daily logging with AI pattern detection
- 🌍 **Outbreak Monitor** — Global threats + personalized protection plan
- 🩹 **First Aid** — Step-by-step CPR, choking, stroke, bleeding guides
- 🚨 **Emergency** — Always-visible 911 + crisis lines

## 📊 Data Sources
- **Claude AI** (Anthropic) — Reasoning engine
- **OpenFDA API** — Live drug interaction data (free)

## 🔒 Security
- API key is stored as a Vercel environment variable — never exposed to the browser
- No health data is stored anywhere — fully stateless
- All connections are HTTPS on Vercel by default
