import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import API from "../services/api";
import { AuthShell } from "../components/layout/auth-shell";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("role", res.data.user.role);
      toast.success("Welcome back");
      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Run your work from one calm dashboard."
      description="Track projects, see momentum, and move through the day without losing the thread."
    >
      <Card className="border-border/80 shadow-xl shadow-black/5">
        <CardHeader className="space-y-2 p-6 pb-2">
          <CardTitle className="text-2xl">Sign in to Worknest</CardTitle>
          <CardDescription>
            Enter your credentials to open your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium">Email</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  className="pl-9"
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  required
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium">Password</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  className="pl-9 pr-10"
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </label>

            <Button className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Worknest?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
