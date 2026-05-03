const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CojF2jFo.js","assets/index-DaN01-Px.css"])))=>i.map(i=>d[i]);
import { r as reactExports, u as useAuthStore, a as useNavigate, j as jsxRuntimeExports, T as Toaster, m as motion, b as ue, _ as __vitePreload } from "./index-CojF2jFo.js";
import { B as Button } from "./button-DxNoqw_w.js";
import { I as Input } from "./input-kWZAC5Ca.js";
import { M as Mail } from "./mail-DAnDnpAI.js";
import { L as Lock, E as EyeOff } from "./lock-CSJbEPS8.js";
import { E as Eye } from "./eye-D_x1Z9FB.js";
import { L as LoaderCircle } from "./loader-circle-C9-KxeC3.js";
import { A as ArrowRight } from "./arrow-right-C-fjScci.js";
function LoginPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [passwordError, setPasswordError] = reactExports.useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const handleSubmit = async (e) => {
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
    const { mockCurrentUser, mockCompany } = await __vitePreload(async () => {
      const { mockCurrentUser: mockCurrentUser2, mockCompany: mockCompany2 } = await import("./index-CojF2jFo.js").then((n) => n.a8);
      return { mockCurrentUser: mockCurrentUser2, mockCompany: mockCompany2 };
    }, true ? __vite__mapDeps([0,1]) : void 0);
    login(mockCurrentUser, mockCompany);
    ue.success("Welcome back! 👋");
    navigate({ to: "/dashboard" });
  };
  const handleOtpLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Enter your email first to use OTP login");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    ue.success("OTP sent! Check your email.");
    navigate({ to: "/otp", search: { email } });
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground tracking-tight", children: "Sync" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Your team workspace" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.12, duration: 0.35 },
              className: "bg-card rounded-2xl border border-border shadow-material p-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-1", children: "Sign in" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: "Enter your credentials to access your workspace" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "email",
                        className: "text-sm font-medium text-foreground",
                        children: "Work email"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "email",
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
                          "data-ocid": "login.email_input",
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
                        "data-ocid": "login.email_field_error",
                        children: error
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "password",
                        className: "text-sm font-medium text-foreground",
                        children: "Password"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "password",
                          type: showPassword ? "text" : "password",
                          placeholder: "Enter your password",
                          value: password,
                          onChange: (e) => {
                            setPassword(e.target.value);
                            if (passwordError) setPasswordError("");
                          },
                          className: `pl-9 pr-10 transition-smooth ${passwordError ? "border-destructive focus-visible:ring-destructive" : ""}`,
                          "data-ocid": "login.password_input",
                          autoComplete: "current-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowPassword((p) => !p),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                          "aria-label": showPassword ? "Hide password" : "Show password",
                          "data-ocid": "login.toggle_password",
                          children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                        }
                      )
                    ] }),
                    passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.p,
                      {
                        initial: { opacity: 0, y: -4 },
                        animate: { opacity: 1, y: 0 },
                        className: "text-xs text-destructive",
                        "data-ocid": "login.password_field_error",
                        children: passwordError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end -mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => navigate({ to: "/forgot-password" }),
                      className: "text-xs text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-2",
                      "data-ocid": "login.forgot_password_link",
                      children: "Forgot password?"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: loading || !email || !password,
                      className: "w-full font-medium",
                      "data-ocid": "login.submit_button",
                      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Sign in",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleOtpLogin,
                      className: "text-xs text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-2",
                      "data-ocid": "login.otp_link",
                      children: "Sign in with email OTP instead"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-border space-y-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "New to Sync?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => ue.info("Registration coming soon"),
                        className: "text-foreground font-medium underline underline-offset-2 hover:opacity-70 transition-smooth",
                        "data-ocid": "login.register_link",
                        children: "Create account"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Have an invite code?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => ue.info("Join via invite code coming soon"),
                        className: "text-foreground font-medium underline underline-offset-2 hover:opacity-70 transition-smooth",
                        "data-ocid": "login.join_link",
                        children: "Join company"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground/60 pt-1", children: "Demo: Use any email + password (min 6 chars)" })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  LoginPage
};
