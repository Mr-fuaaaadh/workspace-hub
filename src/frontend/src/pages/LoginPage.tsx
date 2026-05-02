import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPasswordError("");
    let hasError = false;
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      hasError = true;
    }
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }
    if (hasError) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    const { mockCurrentUser, mockCompany } = await import("@/lib/mock-data");
    login(mockCurrentUser, mockCompany);
    toast.success("Welcome back! 👋");
    navigate({ to: "/dashboard" });
  };

  const handleOtpLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Enter your email first to use OTP login");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    toast.success("OTP sent! Check your email.");
    navigate({ to: "/otp", search: { email } });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-foreground mb-4 shadow-material"
          >
            <span className="text-background font-display font-bold text-xl tracking-tight">
              S
            </span>
          </motion.div>
          <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
            Sync
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Your team workspace
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="bg-card rounded-2xl border border-border shadow-material p-6"
        >
          <h2 className="font-display font-semibold text-lg text-foreground mb-1">
            Sign in
          </h2>
          <p className="text-muted-foreground text-sm mb-5">
            Enter your credentials to access your workspace
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Work email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  onBlur={() => {
                    if (email && !validateEmail(email))
                      setError("Please enter a valid email address");
                    else setError("");
                  }}
                  className={`pl-9 transition-smooth ${
                    error
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  data-ocid="login.email_input"
                  autoFocus
                  autoComplete="email"
                />
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                  data-ocid="login.email_field_error"
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  className={`pl-9 pr-10 transition-smooth ${
                    passwordError
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  data-ocid="login.password_input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-ocid="login.toggle_password"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                  data-ocid="login.password_field_error"
                >
                  {passwordError}
                </motion.p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                onClick={() => navigate({ to: "/forgot-password" })}
                className="text-xs text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-2"
                data-ocid="login.forgot_password_link"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full font-medium"
              data-ocid="login.submit_button"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {/* Passwordless OTP link */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleOtpLogin}
                className="text-xs text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-2"
                data-ocid="login.otp_link"
              >
                Sign in with email OTP instead
              </button>
            </div>
          </form>

          <div className="mt-5 pt-4 border-t border-border space-y-2.5">
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <span>New to Sync?</span>
              <button
                type="button"
                onClick={() => toast.info("Registration coming soon")}
                className="text-foreground font-medium underline underline-offset-2 hover:opacity-70 transition-smooth"
                data-ocid="login.register_link"
              >
                Create account
              </button>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <span>Have an invite code?</span>
              <button
                type="button"
                onClick={() => toast.info("Join via invite code coming soon")}
                className="text-foreground font-medium underline underline-offset-2 hover:opacity-70 transition-smooth"
                data-ocid="login.join_link"
              >
                Join company
              </button>
            </div>
            <p className="text-xs text-center text-muted-foreground/60 pt-1">
              Demo: Use any email + password (min 6 chars)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
