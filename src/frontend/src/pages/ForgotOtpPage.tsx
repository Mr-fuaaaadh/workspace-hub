import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, Loader2, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function ForgotOtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { email?: string };
  const email = search.email ?? "your email";
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maskedEmail = (() => {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const first = local[0] ?? "";
    return `${first}***@${domain}`;
  })();

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(60);
    setCanResend(false);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current!);
          setCanResend(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: startTimer is stable
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current!);
  }, []);

  const handleResend = () => {
    setOtp("");
    setError("");
    startTimer();
    toast.success("New reset code sent!");
  };

  const handleVerify = async (value = otp) => {
    if (value.length < 6) return;
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    // Mock: any 6-digit code works
    toast.success("Code verified!");
    navigate({ to: "/reset-password", search: { email } });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
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
            onClick={() => navigate({ to: "/forgot-password" })}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-5"
            data-ocid="forgot-otp.back_button"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <div className="mb-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-1">
              Enter reset code
            </h2>
            <p className="text-muted-foreground text-sm">
              We sent a 6-digit code to{" "}
              <span className="text-foreground font-medium font-mono">
                {maskedEmail}
              </span>
            </p>
          </div>

          <div className="flex justify-center mb-5">
            <OTPInput
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
              onChange={(val) => {
                setOtp(val);
                if (error) setError("");
              }}
              onComplete={handleVerify}
              data-ocid="forgot-otp.otp_input"
              render={({ slots }) => (
                <div className="flex gap-2">
                  {slots.map((slot, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: OTP slots are positional
                      key={i}
                      className={`w-11 h-13 flex items-center justify-center rounded-xl border-2 text-lg font-mono font-bold transition-smooth ${
                        error
                          ? "border-destructive bg-destructive/5"
                          : slot.isActive
                            ? "border-foreground bg-muted"
                            : slot.char
                              ? "border-foreground bg-card text-foreground"
                              : "border-border bg-background text-foreground"
                      }`}
                    >
                      {slot.char ?? (
                        <span className="text-muted-foreground/30">·</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive text-center mb-3"
              data-ocid="forgot-otp.field_error"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="button"
            onClick={() => handleVerify()}
            disabled={otp.length < 6 || loading}
            className="w-full font-medium mb-4"
            data-ocid="forgot-otp.submit_button"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Verify code"
            )}
          </Button>

          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center gap-1.5 text-sm text-foreground font-medium hover:opacity-70 transition-smooth"
                data-ocid="forgot-otp.resend_button"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Resend code
              </button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend in{" "}
                <span className="font-mono font-semibold text-foreground tabular-nums">
                  0:{countdown.toString().padStart(2, "0")}
                </span>
              </p>
            )}
          </div>

          <p className="text-xs text-center text-muted-foreground/60 mt-4">
            Demo: Any 6-digit code works
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
