import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import girl from "../assets/girl.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-500 to-purple-600">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 text-white p-10 flex-col justify-between bg-gradient-to-br from-indigo-600 to-purple-700">

        {/* TOP */}
        <div>
          <h1 className="text-3xl font-bold tracking-wide">Worknest</h1>
          <p className="text-sm opacity-80 mt-1">
            Productivity simplified
          </p>
        </div>

        {/* CENTER IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src={girl}
            alt="Girl"
            className="w-[600px] drop-shadow-2xl hover:scale-105 transition"
          />
        </div>

        {/* BOTTOM TEXT */}
        <div className="text-center">
          <p className="text-lg font-medium">
            Manage your work smarter
          </p>
          <p className="text-sm opacity-80 mt-2 max-w-xs mx-auto">
            Projects, tasks, and collaboration — all in one place.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center">

        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-white border border-white/30"
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Welcome Back 👋
          </h2>

          {/* EMAIL */}
          <div className="relative">
            <i className="ri-mail-line absolute left-3 top-3 text-white/70"></i>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mt-4">
            <i className="ri-lock-line absolute left-3 top-3 text-white/70"></i>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              className="w-full pl-10 pr-10 p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <i
              className={`ri-eye-${show ? "off" : "line"} absolute right-3 top-3 cursor-pointer`}
              onClick={() => setShow(!show)}
            ></i>
          </div>

          <button className="w-full mt-6 bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>

      </div>
    </div>
  );
}