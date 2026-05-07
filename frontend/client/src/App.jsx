import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Users from "../src/pages/admin/Users";


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
          <Route path="/admin/users" element={<Users />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;