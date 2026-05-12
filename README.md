# WorkNest Dashboard

WorkNest is a modern, full-stack project management dashboard designed to help users organize workstreams and visualize project health. It features a robust React-based frontend and a secure Node.js/Express backend.

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login with password hashing (bcrypt).
- **Project Management**: Full CRUD (Create, Read, Update, Delete) functionality for managing active workstreams.
- **Interactive Dashboard**: 
  - **Visual Analytics**: Weekly activity area charts and project status distribution pie charts using Recharts.
  - **Real-time Stats**: Track total projects, tasks, and completion progress.
- **Responsive Design**: Built with Tailwind CSS and Shadcn/UI components for a seamless experience across mobile and desktop.
- **Dark Mode Support**: System-aware theme switching via Zustand and CSS variables.
- **Data Fetching**: Optimized state management and server-side synchronization using TanStack Query (React Query).

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Zustand (UI state) & TanStack Query (Server state)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Components**: Radix UI Primitives

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: JSON Web Tokens (JWT), Bcrypt.js

## 📂 Project Structure

```text
worknest-dashboard/
├── backend/
│   ├── controllers/    # Request handlers (Auth, Projects)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── middleware/     # Auth protection & error handling
├── frontend/
│   └── client/
│       ├── src/
│       │   ├── components/ # Reusable UI components
│       │   ├── features/   # Dashboard & domain logic
│       │   ├── hooks/      # Custom React hooks (Auth, Theme)
│       │   └── lib/        # API clients & utilities
└── README.md
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   ```
4. Start the server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the frontend folder: `cd frontend/client`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open `http://localhost:5173` in your browser.

## 🛡️ API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and get token

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update project details
- `DELETE /api/projects/:id` - Remove a project

## 📝 License

This project is open source and available under the MIT License.

---
*Built with ❤️ for better productivity.*
