import { r as reactExports, u as useAuthStore, a as useNavigate, j as jsxRuntimeExports, T as Toaster, m as motion, b as ue } from "./index-CojF2jFo.js";
import { B as Button } from "./button-DxNoqw_w.js";
import { I as Input } from "./input-kWZAC5Ca.js";
import { A as ArrowLeft } from "./arrow-left-Cycb2gs4.js";
import { M as Mail } from "./mail-DAnDnpAI.js";
import { L as LoaderCircle } from "./loader-circle-C9-KxeC3.js";
import { A as ArrowRight } from "./arrow-right-C-fjScci.js";
function ForgotPasswordPage() {
  const [email, setEmail] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const { setForgotPasswordEmail } = useAuthStore();
  const navigate = useNavigate();
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const handleSubmit = async (e) => {
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
    ue.success("OTP sent! Check your email.");
    navigate({ to: "/forgot-otp", search: { email } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
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
                    "data-ocid": "forgot-password.back_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                      " Back to login"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-1", children: "Reset your password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Enter your email and we'll send you a reset code" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "forgot-email",
                        className: "text-sm font-medium text-foreground",
                        children: "Work email"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "forgot-email",
                          type: "email",
                          placeholder: "you@company.com",
                          value: email,
                          onChange: (e) => {
                            setEmail(e.target.value);
                            if (error) setError("");
                          },
                          onBlur: () => {
                            if (email && !validateEmail(email))
                              setError("Please enter a valid email address");
                            else setError("");
                          },
                          className: `pl-9 transition-smooth ${error ? "border-destructive focus-visible:ring-destructive" : ""}`,
                          "data-ocid": "forgot-password.email_input",
                          autoFocus: true,
                          autoComplete: "email"
                        }
                      )
                    ] }),
                    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.p,
                      {
                        initial: { opacity: 0, y: -4 },
                        animate: { opacity: 1, y: 0 },
                        className: "text-xs text-destructive",
                        "data-ocid": "forgot-password.field_error",
                        children: error
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: loading || !email,
                      className: "w-full font-medium",
                      "data-ocid": "forgot-password.submit_button",
                      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Send reset code",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                      ] })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground/60 mt-5", children: "Demo: Any valid email will work" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  ForgotPasswordPage
};
