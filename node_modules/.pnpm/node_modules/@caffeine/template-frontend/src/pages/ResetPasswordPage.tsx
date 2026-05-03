import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newError, setNewError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { email?: string };
  const email = search.email ?? "your email";
  const { setForgotPasswordEmail } = useAuthStore();

  const maskedEmail = (() => {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const first = local[0] ?? "";
    return `${first}***@${domain}`;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewError("");
    setConfirmError("");
    let hasError = false;
    if (!newPassword || newPassword.length < 6) {
      setNewError("Password must be at least 6 characters");
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmError("Please confirm your password");
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      setConfirmError("Passwords do not match");
      hasError = true;
    }
    if (hasError) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setDone(true);
    setForgotPasswordEmail(null);
    toast.success("Password reset! Please sign in.");
    setTimeout(() => navigate({ to: "/" }), 1500);
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
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-4 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-foreground" />
              <h2 className="font-display font-semibold text-lg text-foreground">
                Password reset!
              </h2>
              <p className="text-muted-foreground text-sm">
                Redirecting you to login…
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-5">
                <h2 className="font-display font-semibold text-lg text-foreground mb-1">
                  Set new password
                </h2>
                <p className="text-muted-foreground text-sm">
                  Creating a new password for{" "}
                  <span className="text-foreground font-medium font-mono">
                    {maskedEmail}
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="new-password"
                    className="text-sm font-medium text-foreground"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="new-password"
                      type={showNew ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (newError) setNewError("");
                      }}
                      className={`pl-9 pr-10 transition-smooth ${
                        newError
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                      data-ocid="reset-password.new_password_input"
                      autoFocus
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label={showNew ? "Hide password" : "Show password"}
                    >
                      {showNew ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {newError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive"
                      data-ocid="reset-password.new_password_field_error"
                    >
                      {newError}
                    </motion.p>
                  )}
                </div>

                {/* Confirm password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="confirm-password"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="confirm-password"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (confirmError) setConfirmError("");
                      }}
                      className={`pl-9 pr-10 transition-smooth ${
                        confirmError
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                      data-ocid="reset-password.confirm_password_input"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {confirmError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive"
                      data-ocid="reset-password.confirm_password_field_error"
                    >
                      {confirmError}
                    </motion.p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading || !newPassword || !confirmPassword}
                  className="w-full font-medium"
                  data-ocid="reset-password.submit_button"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </form>

              <p className="text-xs text-center text-muted-foreground/60 mt-5">
                Demo: Any matching passwords (min 6 chars) will work
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
