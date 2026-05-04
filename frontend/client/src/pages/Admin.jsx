import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import Layout from "./components/Layout";

function App() {
  const isAuth = Boolean(localStorage.getItem("token"));
  const role = localStorage.getItem("role"); // ✅ important

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔹 Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔹 Protected Layout */}
        <Route element={isAuth ? <Layout /> : <Navigate to="/" />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />

          {/* 👑 Admin Route (FIXED) */}
          <Route
            path="/admin"
            element={
              role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;