# CampusGPT - AI-Powered College Assistant

A revolutionary AI-powered productivity assistant designed specifically for college students, featuring ultra god-level animations, smart scheduling, doubt solving, mood journaling, and campus assistance.

## 🌟 Features

### 🔐 Universal Authentication System
- **Anyone can register** with email, password, and name
- **Secure login system** with password hashing
- **Beautiful animated forms** with ultra smooth transitions
- **Real-time validation** and helpful error messages

### 📅 Smart Scheduler
- AI-generated personalized study plans
- Exam and deadline management
- Study preference optimization
- **Ultra animated interface** with floating elements

### 📚 Doubt Solver
- Subject-specific academic question solving
- Step-by-step explanations powered by Groq's Llama3
- Concept clarification with examples
- **Smooth reveal animations** for AI responses

### 🧘 Mood Journal
- Daily mood tracking with beautiful emoji selection
- AI-powered emotional support and affirmations
- Personalized wellness tips
- **Gorgeous gradient backgrounds** and micro-interactions

### 🏫 Campus Assistant
- Campus facility information and navigation
- Procedure guidance and quick answers
- Student services information
- **Interactive animated interface**

## 🎨 Ultra God-Level Animations

### **Visual Excellence**:
- **Dynamic gradient backgrounds** that shift and flow
- **Floating particles** and animated orbs
- **3D card transforms** with perspective and depth
- **Smooth page transitions** with spring physics
- **Micro-interactions** on every element
- **Sparkles and floating icons** throughout the interface
- **Responsive hover effects** with scale and glow
- **Loading animations** with pulsing elements

### **Color Palette**:
- **Vibrant gradients**: Cyan (#4ECDC4), Purple (#8B5CF6), Pink (#EC4899)
- **Dynamic backgrounds**: Multi-color shifting gradients
- **Glassmorphism effects**: Backdrop blur with transparency
- **Neon accents**: Glowing borders and shadows

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Framer Motion** for ultra smooth animations
- **Tailwind CSS** for responsive styling
- **Axios** for API communication
- **Lucide React** for beautiful icons

### Backend
- **Flask** web framework
- **Groq** Llama3-8b-8192 AI model
- **Flask-CORS** for cross-origin requests
- **python-dotenv** for environment management
- **SHA-256** password hashing

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install Python dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env file and add your GROQ_API_KEY

# Start Flask server
python app.py
```

## 🔑 API Configuration

1. Visit [console.groq.com](https://console.groq.com)
2. Create a free account
3. Generate an API key
4. Add it to `server/.env`:
   ```
   GROQ_API_KEY=your_api_key_here
   ```

## 🎯 Getting Started

1. **Register**: Create your account with any email and password
2. **Explore**: Navigate through the beautifully animated dashboard
3. **Schedule**: Let AI create your perfect study plan
4. **Ask Questions**: Get instant help with academic doubts
5. **Journal**: Track your mood and receive AI support
6. **Campus Help**: Ask about college facilities and procedures

## 🎨 Animation Features

### **Login Form**:
- **3D card entrance** with rotation and scale
- **Floating background particles** with random movement
- **Sparkles and icons** orbiting around the screen
- **Smooth tab switching** with gradient indicators
- **Input focus effects** with glow and scale
- **Form submission** with shimmer effects

### **Dashboard**:
- **Staggered loading** with spring physics
- **3D tab cards** with hover rotations and shadows
- **Dynamic background** with moving gradients
- **Floating elements** and animated icons
- **Smooth transitions** between components

### **Components**:
- **AI response reveals** with typewriter effects
- **Loading spinners** with pulsing animations
- **Button interactions** with scale and glow
- **Micro-animations** on every interaction

## 🌐 Deployment

### Frontend (Netlify)
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Backend (Render)
1. Connect GitHub repository to Render
2. Set build command: `cd server && pip install -r requirements.txt`
3. Set start command: `cd server && python app.py`
4. Add `GROQ_API_KEY` environment variable

## 📱 Mobile Responsive

Fully optimized for:
- **Mobile devices** (< 768px) with touch-friendly animations
- **Tablets** (768px - 1024px) with adaptive layouts
- **Desktop** (> 1024px) with full animation effects

## 🤖 AI Capabilities

- **Smart Study Planning** with personalized schedules
- **Academic Problem Solving** across multiple subjects
- **Emotional Support** with contextual responses
- **Campus Information** with practical guidance
- **Powered by Groq's Llama3** for fast, accurate responses

## 🛠️ Development

### Project Structure
```
├── src/
│   ├── components/         # React components with animations
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── App.tsx            # Main application
├── server/
│   ├── app.py             # Flask application
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment template
└── README.md
```

### Adding New Features
1. Create animated component in `src/components/`
2. Add API route in `server/app.py`
3. Update types in `src/types/`
4. Integrate with main dashboard

## 🎓 Perfect for College Students

- **Universal access** - anyone can create an account
- **Cultural context** in AI responses
- **Indian education system** understanding
- **Practical campus scenarios**
- **Stress management** for academic pressure
- **Beautiful, engaging interface** that students love

## 🏆 Key Improvements

### **Authentication**:
- ✅ **Universal registration** - no more demo credentials
- ✅ **Secure password hashing** with SHA-256
- ✅ **Real-time validation** and error handling
- ✅ **Smooth form animations** with state transitions

### **Animations**:
- ✅ **Ultra god-level** visual effects throughout
- ✅ **3D transforms** and perspective animations
- ✅ **Dynamic gradients** and color shifting
- ✅ **Particle systems** and floating elements
- ✅ **Micro-interactions** on every component

### **User Experience**:
- ✅ **Intuitive navigation** with animated feedback
- ✅ **Responsive design** for all devices
- ✅ **Fast loading** with optimized animations
- ✅ **Accessible** with proper contrast and focus states

## 📄 License

MIT License - feel free to use for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

Built with ❤️ and **ultra god-level animations** for college students worldwide using cutting-edge AI technology.

**CampusGPT** - Where AI meets beautiful design! 🚀✨