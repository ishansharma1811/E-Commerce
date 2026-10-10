# Full-Stack MERN E-Commerce Web Application

A production-ready E-Commerce Web Application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), featuring JWT authentication, role-based access control (Customer & Admin), dynamic cart management, and order processing.

---

## 🏗️ System Architecture

```
[ Client: React + Vite (Port 5173) ]
                 │
                 ▼  Axios HTTP Requests (JSON + Bearer JWT)
[ Backend: Node.js + Express (Port 5000) ]
        ├── Security & Utilities (Helmet, CORS, Rate Limit, Morgan)
        ├── Routes -> Middleware (Auth & Admin Verification)
        └── Controllers (Business Logic & Server-side Price/Stock Checks)
                 │
                 ▼  Mongoose ODM
[ Database: MongoDB (Atlas / Local) ]
        ├── Users (Name, Email, Hashed Password, Role)
        ├── Products (Title, Description, Price, Stock, Category, Image)
        └── Orders (User Ref, Items, Server-verified Pricing, Status)
```

---

## 📁 Project Structure

```text
E-commerce/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static images and icons
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React Context API (AuthContext, CartContext)
│   │   ├── pages/              # Page views (Home, Product, Cart, Checkout, Admin)
│   │   ├── services/           # Axios instance & API caller functions
│   │   ├── App.css
│   │   ├── App.jsx             # Root layout & routing
│   │   ├── index.css           # Global CSS variables & styling
│   │   └── main.jsx            # Entry mount point
│   ├── .env.example            # Client environment template
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend REST API (Node.js + Express)
│   ├── config/                 # DB connection (db.js)
│   ├── controllers/            # Request handlers (auth, product, order)
│   ├── middleware/             # Auth JWT guard, admin guard, error handlers
│   ├── models/                 # Mongoose database schemas (User, Product, Order)
│   ├── routes/                 # REST endpoints (/api/auth, /api/products, /api/orders)
│   ├── scripts/                # Database seed scripts (seedAdmin.js)
│   ├── utils/                  # Helper utilities (generateToken.js)
│   ├── .env.example            # Server environment template
│   ├── package.json
│   └── server.js               # Express application entry point
│
├── .gitignore                  # Protects node_modules, build artifacts & secrets
└── README.md
```

---

## 🚀 Getting Started (Phase 1 Setup)

### 1. Prerequisites
- **Node.js**: v18+ (Current: v24+)
- **npm**: v9+ (Current: v11+)
- **MongoDB**: MongoDB Atlas URI or Local MongoDB Community server

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env     # Configure your MONGO_URI in .env
npm run dev              # Starts Express on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev              # Starts Vite dev server on http://localhost:5173
```

### 4. Health Check
Open your browser to:
- Frontend: `http://localhost:5173`
- Backend API Health: `http://localhost:5000/api/health`
