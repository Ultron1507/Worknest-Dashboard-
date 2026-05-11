import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Users from "./pages/admin/Users";

function App() {
  const [, setAuthVersion] = useState(0);
  const isAuth = Boolean(localStorage.getItem("token"));
  const role = localStorage.getItem("role");
  const handleAuthenticated = () => setAuthVersion((version) => version + 1);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onAuthenticated={handleAuthenticated} />} />
        <Route path="/register" element={<Register onAuthenticated={handleAuthenticated} />} />

        <Route element={isAuth ? <Layout /> : <Navigate to="/" replace />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin/users"
            element={role === "admin" ? <Users /> : <Navigate to="/dashboard" replace />}
          />
        </Route>

        <Route path="*" element={<Navigate to={isAuth ? "/dashboard" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
