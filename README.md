# 🚀 Nexus MVP - AI-Powered Project Roadmap Generator

**Transform any app idea into a comprehensive strategic plan with interactive AI refinement.**

Nexus is a business-ready application that empowers anyone with an idea—from students to founders—to build the next great thing by providing detailed project roadmaps, market analysis, and personalized learning paths.

## ✨ Key Features

### 🎯 **Core Capabilities**
- **Visual Project Roadmap**: Timeline-based project phases with clear deliverables
- **Nexus Intelligence**: Deep market analysis with opportunity assessment
- **MVP Feature Blueprint**: Prioritized feature recommendations
- **Technology Stack Recommendations**: Modern, justified tech choices
- **Curated Learning Hub**: Personalized curriculum with learning resources

### 💬 **Interactive Refinement** (NEW!)
- **AI-Powered Chat**: Continuous conversation to refine your roadmap
- **Context-Aware Responses**: AI understands your existing project
- **Real-Time Updates**: Live modifications to roadmap based on chat
- **Conversation History**: Track how your project evolved

### 🔐 **Business-Ready Platform**
- **Secure Authentication**: Email/Google login via Supabase
- **Project Management**: Save and manage multiple roadmaps
- **Personal Dashboard**: View all your projects in one place
- **Freemium Model**: Usage limits with upgrade potential

## 🛠️ Technology Stack

- **Backend**: Flask (Python)
- **Database**: SQLite (local) + Supabase (cloud)
- **Authentication**: Supabase Auth
- **Frontend**: Jinja2 templates + vanilla JavaScript
- **APIs**: Brave Search, Google Gemini AI, Reddit, GitHub
- **Deployment**: Ready for Vercel/Heroku

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- pip3

### 1. Clone & Setup
```bash
git clone <your-repo-url>
cd nexus-mvp
pip3 install -r requirements.txt
```

### 2. Environment Configuration
Create a `.env` file in the project root:
```env
# === API KEYS ===
BRAVE_API_KEY=your_brave_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=your_reddit_user_agent
GITHUB_TOKEN=your_github_token_here
GOOGLE_CSE_API_KEY=your_google_cse_api_key
GOOGLE_CSE_ID=your_google_cse_id
STABILITY_API_KEY=your_stability_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

### 3. Run the Application
```bash
python3 app.py
```

Visit `http://localhost:5001` to start generating roadmaps!

## 📚 API Setup Guide

Nexus works with demo data out of the box, but for full functionality, set up these free APIs:

### 🔍 **Brave Search API** (Web Search)
1. Visit [Brave Search API](https://brave.com/search/api/)
2. Sign up for free account (2,000 queries/month)
3. Get API key → Add to `BRAVE_API_KEY`

### 🤖 **Google AI Studio** (Gemini)
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create free account (generous limits)
3. Generate API key → Add to `GEMINI_API_KEY`

### 💬 **Reddit API** (User Sentiment)
1. Visit [Reddit Apps](https://www.reddit.com/prefs/apps)
2. Create "script" application
3. Get client ID & secret → Add to `REDDIT_CLIENT_ID` & `REDDIT_CLIENT_SECRET`

### 🐙 **GitHub API** (Tech Trends)
1. Go to [GitHub Settings](https://github.com/settings/tokens)
2. Generate personal access token
3. Add to `GITHUB_TOKEN`

### 🔍 **Google Custom Search** (Market Analysis)
1. Visit [Google Custom Search](https://cse.google.com/)
2. Create search engine for tech sites (TechCrunch, VentureBeat, etc.)
3. Get API key & Engine ID → Add to `GOOGLE_CSE_API_KEY` & `GOOGLE_CSE_ID`

### 🛡️ **Supabase** (Authentication & Database)
1. Create project at [Supabase](https://supabase.com/)
2. Get URL & anon key → Add to `SUPABASE_URL` & `SUPABASE_KEY`

## 💡 Usage Examples

### Basic Project Generation
1. Visit the homepage
2. Enter your project idea: "Food delivery app for college students"
3. Click "Generate Roadmap"
4. Get comprehensive analysis and roadmap

### Interactive Refinement
1. Open any generated project
2. Click "Show Chat" to expand refinement interface
3. Ask questions like:
   - "How can I reduce the budget for this project?"
   - "Can you make the timeline faster?"
   - "What features should I prioritize first?"
   - "Are there better technology options?"

### Refinement Categories
- **💰 Budget Optimization**: Get cost-effective alternatives
- **⚡ Timeline Acceleration**: Faster development strategies  
- **🎯 Feature Prioritization**: Focus on core MVP features
- **🔧 Technology Changes**: Explore different tech stacks
- **📊 Market Deep-Dive**: Enhanced competitive analysis
- **📚 Learning Customization**: Personalized skill development

## 📁 Project Structure

```
nexus-mvp/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables (create this)
├── .gitignore           # Git ignore rules
├── README.md            # This file
├── nexus_data.db        # SQLite database (auto-created)
├── templates/           # HTML templates
│   ├── index.html       # Landing page & generator
│   ├── project.html     # Project report view
│   └── dashboard.html   # User dashboard
└── API_SETUP_GUIDE.md   # Detailed API setup instructions
```

## 🌟 Demo Mode

Nexus includes a comprehensive demo mode with realistic mock data:
- **Professional search results** with built-in intelligence
- **Market analysis** with competitor insights
- **Technology recommendations** with modern stacks
- **Learning paths** with curated resources

Perfect for testing and demonstrations without API setup!

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Heroku
```bash
# Create Procfile
echo "web: python app.py" > Procfile

# Deploy
git push heroku main
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/nexus-mvp/issues)
- **Documentation**: Check `API_SETUP_GUIDE.md` for detailed setup
- **Demo**: Works out of the box with mock data

## 🎯 Roadmap

- [ ] **Mermaid.js Integration**: Visual diagrams in roadmaps
- [ ] **Team Collaboration**: Multi-user project editing
- [ ] **Export Features**: PDF/Word export of roadmaps
- [ ] **Advanced Analytics**: Project success tracking
- [ ] **Mobile App**: React Native companion app

---

**Built with ❤️ for creators and innovators worldwide** 