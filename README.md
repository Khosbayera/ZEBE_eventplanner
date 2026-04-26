## 🎉 ZEBE Event Planner

> **AI-powered event planning web app — built for Mongolia**

🌐 **Live Demo:** https://zebe-backend.onrender.com

---

## 📌 Overview

ZEBE is a **full-stack event planning application** that helps users plan events by selecting venues, catering, and entertainment. It features:

- 🤖 **AI-powered plan generation** — creates 3 budget-tiered event plans
- 💬 **AI Chat Assistant** — powered by Claude, recommends real services from the database
- 🌏 **Bilingual support** — Mongolian & English
- 🔐 **JWT Authentication** — secure register & login

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Axios |
| **Backend** | Node.js, Express, MongoDB, Mongoose |
| **Auth** | JWT, bcryptjs |
| **AI** | Anthropic Claude API |
| **DevOps** | GitHub Actions, SonarCloud, Docker, Render |

---

## 🚀 CI/CD Pipeline

Every push to `main` automatically triggers:

1. ✅ **SonarCloud** — code quality & security analysis
2. 🐳 **Docker** — builds & pushes image to Docker Hub (`khosbayera/zebe-webapp`)
3. 🌐 **Render** — auto-deploys the latest version

---

## 📁 Project Structure

```
ZEBE_eventplanner/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions pipeline
├── Dockerfile                 # Docker build config
├── sonar-project.properties   # SonarCloud config
├── frontend/
│   ├── src/
│   │   ├── components/        # Header, PlannerSection, AIChatSection...
│   │   ├── data/              # mockData.js
│   │   └── App.jsx
│   └── vite.config.js
└── backend/
    ├── controllers/           # authController, eventController
    ├── middleware/            # authMiddleware, errorHandler
    ├── models/                # User, Venue, Catering, Entertainment, SavedPlan
    ├── routes/                # auth, event, plan, chat
    ├── public/                # Built frontend (auto-generated, do not edit)
    ├── seed.js                # Database seeder
    └── server.js              # Entry point
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register user | ❌ |
| `POST` | `/api/auth/login` | Login, returns JWT | ❌ |
| `POST` | `/api/plan-event` | Generate 3 event plans | ✅ |
| `GET` | `/api/venues` | List all venues | ❌ |
| `GET` | `/api/catering` | List catering options | ❌ |
| `GET` | `/api/entertainment` | List entertainment | ❌ |
| `GET` | `/api/plans` | Get saved plans | ✅ |
| `POST` | `/api/plans` | Save a plan | ✅ |
| `DELETE` | `/api/plans/:id` | Delete a plan | ✅ |
| `POST` | `/api/chat` | AI chat assistant | ✅ |
| `GET` | `/api/health` | Health check | ❌ |

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ANTHROPIC_API_KEY=your_anthropic_api_key
PORT=5001
```

---

## 💻 Local Development

```bash
# 1️⃣ Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 2️⃣ Seed the database
cd backend && node seed.js

# 3️⃣ Run backend (port 5001)
cd backend && npm run dev

# 4️⃣ Run frontend (port 3000)
cd frontend && npm run dev
```

---

## ☁️ Deploying to Render

| Setting | Value |
|---|---|
| **Root Directory** | *(leave blank)* |
| **Build Command** | `cd frontend && npm install && npm run build && cd ../backend && npm install` |
| **Start Command** | `node backend/server.js` |

> ⚠️ Add all `.env` variables in Render's **Environment** settings tab.

---

## ⚠️ Common Issues

**🔴 Frontend changes not showing on Render:**
```bash
cd frontend
npm run build
git add .
git commit -m "rebuild frontend"
git push
```

**🔴 MongoDB not connecting** — Check `MONGO_URI` in Render env vars. Allow all IPs `0.0.0.0/0` in MongoDB Atlas.

**🔴 AI chat not working** — Check `ANTHROPIC_API_KEY` is correctly set in Render env vars.

---

## ✨ Features

- 🔐 JWT-based authentication (register & login)
- 🤖 AI plan generator — 3 budget-tiered event plans
- 🏛️ Service explorer — browse venues, catering & entertainment
- 💬 AI chat assistant powered by Claude
- 💾 Save, view & delete your event plans
- 🎨 Mongolian ornament UI design with bilingual support
- 🔄 Full CI/CD pipeline — SonarCloud + Docker + Render
