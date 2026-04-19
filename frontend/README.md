# ZEBE Frontend

A dark-luxury React frontend for the ZEBE Event Planning System.

## Tech Stack
- React 18 + Vite
- Tailwind CSS (custom gold + dark theme)
- Axios (API calls)
- Custom SVG Mongolian ornamental components

## Setup

### 1. Install dependencies
```bash
cd zebe-frontend
npm install
```

### 2. Make sure your backend is running
```bash
# In the backend folder:
npm run dev   # → runs on http://localhost:5000
```

### 3. Start the frontend
```bash
npm run dev   # → runs on http://localhost:3000
```

The Vite proxy is configured to forward `/api/*` requests to `localhost:5000`
so no CORS issues.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Sticky header with nav
│   ├── MongolianOrnament.jsx # SVG decorative components
│   ├── PlannerSection.jsx   # AI planner form + results
│   ├── PlanCard.jsx         # Individual plan result card
│   ├── ServiceExplorer.jsx  # Browse services section
│   └── ServiceCard.jsx      # Individual service card
├── data/
│   └── mockData.js          # Mock data for Service Explorer
├── App.jsx                  # Root component + hero page
├── main.jsx                 # React entry point
└── index.css                # Dark luxury theme + animations
```

## Features

### AI Event Planner
- Form with event type, budget, guests, style
- Budget allocation sliders (must total 100%)
- Live % counter with color feedback
- Calls `POST /api/plan-event`
- Displays 3 plan cards: Budget / Balanced / Premium

### Service Explorer
- Browse Venues, Catering, Entertainment
- Filter by style or type
- Card hover animations with Mongolian corner ornaments
- Star ratings display

## Design System
- Background: `#0B0B0B`
- Gold accent: `#D4AF37` with shimmer animation
- Fonts: Cinzel (headings) + Cormorant Garamond (display) + Outfit (UI)
- Mongolian ornamental SVG dividers and corner decorations
