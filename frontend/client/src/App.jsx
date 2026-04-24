import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

function App() {
  const isAuth = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔹 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔹 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuth ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;