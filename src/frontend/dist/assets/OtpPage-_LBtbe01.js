import { r as reactExports, a as useNavigate, c as useSearch, u as useAuthStore, j as jsxRuntimeExports, T as Toaster, m as motion, d as mockCurrentUser, e as mockCompany, b as ue } from "./index-CojF2jFo.js";
import { B as Button } from "./button-DxNoqw_w.js";
import { L as Lt, K as Kt, R as RotateCcw } from "./index-Cb46k-fP.js";
import { A as ArrowLeft } from "./arrow-left-Cycb2gs4.js";
import { L as LoaderCircle } from "./loader-circle-C9-KxeC3.js";
function OtpPage() {
  const [otp, setOtp] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [countdown, setCountdown] = reactExports.useState(60);
  const [canResend, setCanResend] = reactExports.useState(false);
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const email = search.email ?? "your email";
  const { login } = useAuthStore();
  const timerRef = reactExports.useRef(null);
  const maskedEmail = (() => {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const first = local[0] ?? "";
    return `${first}***@${domain}`;
  })();
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return c - 1;
      });
    }, 1e3);
  };
  reactExports.useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);
  const handleResend = async () => {
    setCanResend(false);
    setCountdown(60);
    setOtp("");
    setError("");
    startTimer();
    ue.success("New OTP sent to your email!");
  };
  const handleVerify = async (value = otp) => {
    if (value.length < 6) return;
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    login(mockCurrentUser, mockCompany);
    ue.success("Welcome to Sync! 👋");
    navigate({ to: "/dashboard" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        className: "w-full max-w-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0.8, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { delay: 0.05, duration: 0.35 },
                className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-foreground mb-4 shadow-material",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-background font-display font-bold text-xl tracking-tight", children: "S" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground tracking-tight", children: "Sync" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.12, duration: 0.35 },
              className: "bg-card rounded-2xl border border-border shadow-material p-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate({ to: "/" }),
                    className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-5",
                    "data-ocid": "otp.back_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                      " Back to login"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-1", children: "Check your email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
                    "We sent a 6-digit code to",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium font-mono", children: maskedEmail })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Lt,
                  {
                    maxLength: 6,
                    pattern: Kt,
                    value: otp,
                    onChange: (val) => {
                      setOtp(val);
                      if (error) setError("");
                    },
                    onComplete: handleVerify,
                    "data-ocid": "otp.otp_input",
                    render: ({ slots }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: slots.map((slot, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-11 h-13 flex items-center justify-center rounded-xl border-2 text-lg font-mono font-bold transition-smooth ${error ? "border-destructive bg-destructive/5" : slot.isActive ? "border-foreground bg-muted" : slot.char ? "border-foreground bg-card text-foreground" : "border-border bg-background text-foreground"}`,
                        children: slot.char ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30", children: "·" })
                      },
                      i
                    )) })
                  }
                ) }),
                error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: -4 },
                    animate: { opacity: 1, y: 0 },
                    className: "text-xs text-destructive text-center mb-3",
                    "data-ocid": "otp.field_error",
                    children: error
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    onClick: () => handleVerify(),
                    disabled: otp.length < 6 || loading,
                    className: "w-full font-medium mb-4",
                    "data-ocid": "otp.submit_button",
                    children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Verify & Sign In"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: canResend ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleResend,
                    className: "inline-flex items-center gap-1.5 text-sm text-foreground font-medium hover:opacity-70 transition-smooth",
                    "data-ocid": "otp.resend_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                      " Resend code"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Resend in",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground tabular-nums", children: [
                    "0:",
                    countdown.toString().padStart(2, "0")
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground/60 mt-4", children: "Demo: Any 6-digit code works" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  OtpPage
};
