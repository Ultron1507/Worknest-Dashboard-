<div align="center">
  
# WorkNest Dashboard

### A Modern Full-Stack Project & Task Management Application

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**WorkNest** is a beautiful, responsive, and feature-rich project management dashboard that helps teams and individuals organize projects, track tasks, and monitor progress with insightful analytics.

🔗 **[Live Demo](#)** &nbsp;·&nbsp; *(update this link once deployed)*

</div>

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Available Scripts](#-available-scripts)
- [Testing](#-testing)
- [API Overview](#-api-overview)
- [Deployment](#-deployment)
- [Security Notes](#-security-notes)
- [Production Environment Variables](#-production-environment-variables)
- [Before Going Live](#-before-going-live)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Key Features

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

## 🧰 Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS + Shadcn/UI
- TanStack Query (React Query)
- Recharts
- Zustand
- Lucide Icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)

**Database**
- MongoDB (Atlas or local)

---

## 📸 Screenshots

> Add screenshots here once available, for example:
>
> ![Dashboard](./screenshots/dashboard.png)
> ![Projects](./screenshots/projects.png)
> ![Analytics](./screenshots/analytics.png)

---

## 📂 Project Structure

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

## ⚡ Quick Start

### Prerequisites

- Node.js 20+
- npm
- MongoDB connection string (Atlas recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/worknest-dashboard.git
cd worknest-dashboard
```

### 2. Backend Setup

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

Run the backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

### 3. Frontend Setup

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

App available at: `http://localhost:5173`

---

## 📜 Available Scripts

**Backend**
```bash
npm run dev      # Development with nodemon
npm start        # Production
```

**Frontend**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🧪 Testing

No automated test suite is included yet. Contributions adding unit/integration coverage (e.g. Jest or Vitest for the frontend, Jest + Supertest for the backend) are very welcome — see [Contributing](#-contributing).

---

## 🔌 API Overview

A high-level look at the main endpoints. Update this table to match your actual route names if they differ.

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in and receive a JWT | No |
| GET | `/api/auth/me` | Get the current user's profile | Yes |
| GET | `/api/projects` | List all projects for the user | Yes |
| POST | `/api/projects` | Create a new project | Yes |
| PUT | `/api/projects/:id` | Update a project | Yes |
| DELETE | `/api/projects/:id` | Delete a project | Yes |
| GET | `/api/tasks` | List tasks (filterable by project/status) | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |
| GET | `/api/users` | List all users (Admin only) | Yes (Admin) |
| PUT | `/api/users/:id/role` | Update a user's role (Admin only) | Yes (Admin) |
| GET | `/api/health` | Health check endpoint | No |

---

## 🚀 Deployment

### Backend (Render, Railway, Fly.io, etc.)

1. Push the `backend` folder.
2. Set all environment variables (especially `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`).
3. Install command: `npm install`
4. Build/Start command: `npm start`

### Frontend (Vercel, Netlify)

1. Deploy the `frontend/client` folder.
2. Set `VITE_API_URL` to your deployed backend URL.
3. Build command: `npm run build`
4. Output directory: `dist`

---

## 🔐 Security Notes

- Passwords are securely hashed with **bcrypt**
- JWT tokens expire in **24 hours**
- Admin routes require both authentication and the `admin` role
- Sensitive routes are protected by middleware
- Development-only routes (e.g. password reset) are disabled in production
- Always use a strong, unique `JWT_SECRET` in production

---

## 🔧 Production Environment Variables

**Backend**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_very_strong_production_secret
CLIENT_URL=https://your-frontend-domain.com
```

**Frontend**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## ✅ Before Going Live

- [ ] Replace `JWT_SECRET` with a strong random value
- [ ] Update `CLIENT_URL` with your production frontend domain
- [ ] Whitelist your backend IP in MongoDB Atlas
- [ ] Test the `/api/health` endpoint
- [ ] Run `npm run build` and `npm run lint` on the frontend
- [ ] Add real screenshots and a live demo link above

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run `npm run lint` and make sure it passes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Name](https://linkedin.com/in/your-username)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)
