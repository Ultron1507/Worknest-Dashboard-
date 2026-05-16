<<<<<<< HEAD
# WorkNest Dashboard

WorkNest Dashboard is a full-stack task and project management app built with React, Vite, Express, MongoDB, and JWT authentication.

## Features

- User registration and login
- JWT-protected dashboard routes
- Project management
- Task management with status, priority, due date, and project linking
- User profile updates with optional profile image upload
- Admin user list and role management
- Production health check endpoint

## Tech Stack

- Frontend: React, Vite, React Router, TanStack Query, Axios, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer
- Database: MongoDB Atlas or local MongoDB

## Project Structure

```text
worknest-dashboard/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    server.js
  frontend/
    client/
      src/
```

## Prerequisites

- Node.js 20 or newer
- npm
- MongoDB connection string

## Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## Frontend Setup

```bash
cd frontend/client
npm install
```

Create `frontend/client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

The app will run at:

```text
http://localhost:5173
```

## Available Scripts

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Production Environment Variables

Backend production variables:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_connection_string
JWT_SECRET=use_a_long_random_production_secret
CLIENT_URL=https://your-frontend-domain.com
```

Frontend production variables:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

## Deployment Notes

Backend deployment:

1. Deploy the `backend` folder to Render, Railway, Fly.io, or a Node hosting provider.
2. Set all backend production environment variables.
3. Use `npm install` as the install command.
4. Use `npm start` as the start command.
5. After deployment, test `/api/health`.

Frontend deployment:

1. Deploy `frontend/client` to Vercel, Netlify, or another static frontend host.
2. Set `VITE_API_URL` to the deployed backend API URL.
3. Use `npm install` as the install command.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.

## Security Notes

- Passwords are hashed with bcrypt before storage.
- JWT tokens expire after 1 day.
- Admin APIs require both authentication and admin role authorization.
- Production startup requires `MONGO_URI` and `JWT_SECRET`.
- The development password reset route is disabled in production.
- Expired or invalid tokens are cleared on the frontend and users are redirected to login.

## Before Going Live

- Use a strong, unique `JWT_SECRET`.
- Add your deployed frontend URL to `CLIENT_URL`.
- Confirm MongoDB Atlas network access allows your backend host.
- Confirm `/api/health` returns `status: "ok"`.
- Run `npm run build` in `frontend/client`.
- Run `npm run lint` in `frontend/client`.

=======
<div align="center">
  <h1>WorkNest Dashboard</h1>
  <p><strong>A Modern Full-Stack Project Management Dashboard</strong></p>
  
  <img src="https://img.shields.io/badge/MERN-Stack-00C853?style=for-the-badge" alt="MERN" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge" alt="Tailwind" />
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge" alt="React Query" />
</div>

<br>

**WorkNest** is a beautiful and functional project management dashboard that helps users organize tasks, track progress, and visualize project health with interactive charts and real-time analytics.

---

### ✨ Key Features

- **Secure Authentication** — JWT + bcrypt with protected routes
- **Full Project CRUD** — Create, Read, Update, and Delete projects
- **Interactive Analytics** — Weekly activity area chart & project status donut chart using Recharts
- **Real-time Stats** — Total projects, tasks, completion rate with monthly growth
- **Modern & Clean UI** — Built with Tailwind CSS + Shadcn/UI + Dark Mode
- **Optimized Data Fetching** — TanStack Query (React Query)
- **Fully Responsive** — Excellent experience on both desktop and mobile

---

### 🛠️ Tech Stack

**Frontend:**  
React 18 (Vite) • Tailwind CSS • Shadcn/UI • Zustand • TanStack Query • Recharts • Lucide Icons

**Backend:**  
Node.js • Express.js • MongoDB (Mongoose) • JWT Authentication

---

---

### 🚀 Live Demo

> *Add Live Demo link here after deployment*

---

### 📂 Project Structure

```text
worknest-dashboard/
├── backend/          # Node.js + Express + MongoDB
├── frontend/client/  # React + Vite + Tailwind
└── README.md
>>>>>>> 84ad5a0f02881b3f1ac8ec4ba6690f44ecb75ce2
