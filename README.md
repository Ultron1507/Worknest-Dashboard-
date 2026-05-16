```markdown
<div align="center">
  <h1>WorkNest Dashboard</h1>
  <p><strong>A Modern Full-Stack Project & Task Management Application</strong></p>

  <img src="https://img.shields.io/badge/MERN-Stack-00C853?style=for-the-badge&logo=mern" alt="MERN" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Shadcn%2FUI-000000?style=for-the-badge" alt="Shadcn/UI" />

  <br><br>

  **WorkNest** is a beautiful, responsive, and feature-rich project management dashboard that helps teams and individuals organize projects, track tasks, and monitor progress with insightful analytics.
</div>

---

### ✨ Key Features

- **Secure Authentication** — Register, login, and protected routes using JWT + bcrypt
- **Project Management** — Full CRUD operations for projects
- **Advanced Task Management** — Status, priority, due dates, and project linking
- **Interactive Analytics** — Weekly activity area chart and project status donut chart (Recharts)
- **Real-time Dashboard Stats** — Total projects, tasks, completion rate, and monthly growth
- **User Profile** — Update details with optional profile image upload
- **Admin Panel** — User list and role management (Admin only)
- **Modern UI/UX** — Clean design with Tailwind CSS, Shadcn/UI, dark mode support, and full responsiveness
- **Optimized Performance** — TanStack Query for efficient data fetching and caching

---

### 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS + Shadcn/UI
- TanStack Query (React Query)
- Recharts
- Zustand
- Lucide Icons

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)

**Database:** MongoDB (Atlas or local)

---

### 🚀 Live Demo

> *Add your deployed demo link here*

---

### 📸 Screenshots

<!-- Add screenshots here after deployment -->
<!-- 
![Dashboard](screenshot-dashboard.png)
![Projects](screenshot-projects.png)
![Analytics](screenshot-analytics.png)
-->

---

### 📂 Project Structure

```text
worknest-dashboard/
├── backend/                  # Node.js + Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/client/          # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   └── public/
└── README.md
```

---

### ⚡ Quick Start

#### Prerequisites
- Node.js 20+
- npm
- MongoDB connection string (Atlas recommended)

#### 1. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_long_random_secret_key_here
CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`  
Health check: `http://localhost:5000/api/health`

#### 2. Frontend Setup

```bash
cd frontend/client
npm install
```

Create `frontend/client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

App available at: `http://localhost:5173`

---

### 📜 Available Scripts

**Backend:**
```bash
npm run dev      # Development with nodemon
npm start        # Production
```

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

### 🚀 Deployment

#### Backend (Render, Railway, Fly.io, etc.)
1. Push the `backend` folder.
2. Set all environment variables (especially `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`).
3. Install command: `npm install`
4. Build/Start command: `npm start`

#### Frontend (Vercel, Netlify)
1. Deploy the `frontend/client` folder.
2. Set `VITE_API_URL` to your deployed backend URL.
3. Build command: `npm run build`
4. Output directory: `dist`

---

### 🔐 Security Notes

- Passwords are securely hashed with **bcrypt**
- JWT tokens expire in **24 hours**
- Admin routes require both authentication and `admin` role
- Sensitive routes are protected by middleware
- Development-only routes (e.g., password reset) are disabled in production
- Always use a strong, unique `JWT_SECRET` in production

---

### 🛠️ Production Environment Variables

**Backend:**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_very_strong_production_secret
CLIENT_URL=https://your-frontend-domain.com
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

### ✅ Before Going Live

- Replace `JWT_SECRET` with a strong random value
- Update `CLIENT_URL` with your production frontend domain
- Whitelist your backend IP in MongoDB Atlas
- Test the `/api/health` endpoint
- Run `npm run build` and `npm run lint` on frontend

---

### 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---
