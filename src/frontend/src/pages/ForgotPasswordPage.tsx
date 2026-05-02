import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setForgotPasswordEmail } = useAuthStore();
  const navigate = useNavigate();

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setForgotPasswordEmail(email);
    toast.success("OTP sent! Check your email.");
    navigate({ to: "/forgot-otp", search: { email } });
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="bg-card rounded-2xl border border-border shadow-material p-6"
        >
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-5"
            data-ocid="forgot-password.back_button"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to login
          </button>

          <div className="mb-5">
            <h2 className="font-display font-semibold text-lg text-foreground mb-1">
              Reset your password
            </h2>
            <p className="text-muted-foreground text-sm">
              Enter your email and we'll send you a reset code
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="forgot-email"
                className="text-sm font-medium text-foreground"
              >
                Work email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="forgot-email"
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
                  data-ocid="forgot-password.email_input"
                  autoFocus
                  autoComplete="email"
                />
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                  data-ocid="forgot-password.field_error"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full font-medium"
              data-ocid="forgot-password.submit_button"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Send reset code
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground/60 mt-5">
            Demo: Any valid email will work
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
