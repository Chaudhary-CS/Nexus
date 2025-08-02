# 🚀 Nexus Professional API Setup Guide

Your Nexus Intelligence Platform is ready to be powered by **professional APIs**! Follow this guide to unlock the full potential with **real data from Brave Search, Gemini AI, Reddit, GitHub, and more**.

## 📋 Quick Setup Checklist

- [ ] Install required libraries
- [ ] Get API keys from providers
- [ ] Create .env file with credentials
- [ ] Test each API integration
- [ ] Enjoy unlimited professional intelligence!

---

## 🛠️ Step 1: Install Required Libraries

```bash
cd "GCSE private"
pip install -r requirements.txt
```

---

## 🔑 Step 2: Get Your API Keys (All Free Tiers Available!)

### 1. **Brave Search API** (2,000 free queries/month)
- Visit: https://api.search.brave.com/
- Sign up for free account
- Get your API key from dashboard
- **Cost:** FREE for 2,000 queries/month

### 2. **Google AI Studio (Gemini)** (Free tier available)
- Visit: https://makersuite.google.com/app/apikey
- Sign in with Google account
- Create new API key
- **Cost:** FREE with generous limits

### 3. **Reddit API** (Free)
- Visit: https://www.reddit.com/prefs/apps/
- Click "Create App" or "Create Another App"
- Choose "script" type
- Note down: Client ID, Client Secret
- **Cost:** FREE

### 4. **GitHub API** (5,000 requests/hour free)
- Visit: https://github.com/settings/tokens
- Generate new token (classic)
- Check "public_repo" scope
- **Cost:** FREE for public repos

### 5. **Google Custom Search** (100 queries/day free)
- Visit: https://developers.google.com/custom-search/v1/introduction
- Create custom search engine
- Get API key and Search Engine ID
- **Cost:** FREE for 100 queries/day

### 6. **Stability AI** (Optional - for image generation)
- Visit: https://platform.stability.ai/
- Sign up for free credits
- **Cost:** FREE credits on signup

---

## 📝 Step 3: Create .env File

Create a file named `.env` in your project directory:

```bash
# Copy this template and replace with your actual API keys

# Brave Search API (2,000 free queries/month)
BRAVE_API_KEY=your_brave_api_key_here

# Google AI Studio (Gemini) - Free tier available
GEMINI_API_KEY=your_gemini_api_key_here

# Reddit API - Free
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=nexus_intelligence_bot/1.0

# GitHub API - Free (5,000 requests/hour)
GITHUB_TOKEN=your_github_token_here

# Google Custom Search (100 queries/day free)
GOOGLE_CSE_API_KEY=your_google_cse_key
GOOGLE_CSE_ID=your_search_engine_id

# Stability AI (Free credits on signup)
STABILITY_API_KEY=your_stability_api_key
```

---

## 🧪 Step 4: Test Your Setup

1. **Start your Nexus:**
```bash
python3 app.py
```

2. **Open browser:** `http://127.0.0.1:5001`

3. **Test search:** Try "React development" or "Python AI"

4. **Check terminal logs:** You should see:
```
Debug - Found 10 professional results
Debug - Professional result 1: tech_score=85, APIs=Brave+Gemini+Reddit+GitHub
```

---

## 🎯 What Each API Provides

| API | What It Does | Free Limit | Nexus Feature |
|-----|-------------|------------|---------------|
| **Brave Search** | Real web search results | 2,000/month | Core search results |
| **Gemini AI** | Intelligence analysis | Generous free tier | Nexus Intelligence insights |
| **Reddit API** | User sentiment & discussions | Unlimited | Community sentiment analysis |
| **GitHub API** | Tech popularity & trends | 5,000/hour | Technology scoring |
| **Google CSE** | Market intelligence | 100/day | Competitor analysis |
| **Stability AI** | Image generation | Free credits | Visual concepts |

---

## 🚀 Progressive Enhancement

**Your Nexus works in 3 modes:**

1. **Demo Mode** (Default - No setup required)
   - Uses intelligent mock data
   - Perfect for testing and development
   - All UI features work

2. **Partial API Mode** (Some APIs configured)
   - Real data where available
   - Falls back to demo for missing APIs
   - Gradual enhancement

3. **Full Professional Mode** (All APIs configured)
   - 100% real data from professional sources
   - Complete AI-powered intelligence
   - Production-ready platform

---

## 🎨 Your UI Stays Exactly the Same!

**No matter which mode you're in, your beautiful UI remains identical:**
- ✅ Same search interface
- ✅ Same Nexus Intelligence sections
- ✅ Same tech scoring and recommendations
- ✅ Same analytics dashboard

**The only difference:** Real professional data instead of demo data!

---

## 🔧 Troubleshooting

### "Demo mode" messages in terminal?
- Check your `.env` file exists
- Verify API keys are correct
- Ensure no extra spaces in .env file

### API rate limits?
- Brave Search: 2,000/month (plenty for development)
- GitHub: 5,000/hour (very generous)
- Reddit: Unlimited
- Gemini: Generous free tier

### Want to test individual APIs?
- Start with just one API key in .env
- Nexus will use real data for that API, demo for others
- Gradually add more APIs

---

## 💡 Pro Tips

1. **Start with Brave Search + Gemini** - These give the biggest impact
2. **Add GitHub API next** - Enhances tech scoring significantly  
3. **Reddit API adds community insights** - Great for user sentiment
4. **Google CSE for competitor intel** - Professional market analysis

**Your Nexus is designed to work beautifully at every stage! 🎯**

---

## 🎉 Ready to Launch?

Once configured, your Nexus becomes a **professional AI-powered technology intelligence platform** with:

- **Real-time web search** via Brave API
- **AI analysis** via Gemini
- **Community sentiment** via Reddit
- **Tech trends** via GitHub
- **Market intelligence** via Google CSE

**Same beautiful UI, now with professional-grade intelligence! 🚀** 