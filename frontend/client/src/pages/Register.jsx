import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import API from "../services/api";
import { AuthShell } from "../components/layout/auth-shell";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/register", form);
      toast.success(`Welcome ${res.data.user.name}`);
      navigate("/");
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Start organized"
      title="Create a workspace that feels lighter to run."
      description="Bring projects, tasks, and personal workflow into a single polished operating view."
    >
      <Card className="border-border/80 shadow-xl shadow-black/5">
        <CardHeader className="space-y-2 p-6 pb-2">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Set up Worknest and start organizing your projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium">Full name</span>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  className="pl-9"
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  required
                />
              </div>
            </label>

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
                  placeholder="Create a password"
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
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
