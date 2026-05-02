import { f as createLucideIcon, r as reactExports, a as useNavigate, c as useSearch, u as useAuthStore, j as jsxRuntimeExports, T as Toaster, m as motion, b as ue } from "./index-CojF2jFo.js";
import { B as Button } from "./button-DxNoqw_w.js";
import { I as Input } from "./input-kWZAC5Ca.js";
import { L as Lock, E as EyeOff } from "./lock-CSJbEPS8.js";
import { E as Eye } from "./eye-D_x1Z9FB.js";
import { L as LoaderCircle } from "./loader-circle-C9-KxeC3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function ResetPasswordPage() {
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showNew, setShowNew] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [newError, setNewError] = reactExports.useState("");
  const [confirmError, setConfirmError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const email = search.email ?? "your email";
  const { setForgotPasswordEmail } = useAuthStore();
  const maskedEmail = (() => {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const first = local[0] ?? "";
    return `${first}***@${domain}`;
  })();
  const handleSubmit = async (e) => {
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
    ue.success("Password reset! Please sign in.");
    setTimeout(() => navigate({ to: "/" }), 1500);
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.12, duration: 0.35 },
              className: "bg-card rounded-2xl border border-border shadow-material p-6",
              children: done ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  className: "flex flex-col items-center gap-3 py-4 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Password reset!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Redirecting you to login…" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-1", children: "Set new password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
                    "Creating a new password for",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium font-mono", children: maskedEmail })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "new-password",
                        className: "text-sm font-medium text-foreground",
                        children: "New password"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "new-password",
                          type: showNew ? "text" : "password",
                          placeholder: "Min. 6 characters",
                          value: newPassword,
                          onChange: (e) => {
                            setNewPassword(e.target.value);
                            if (newError) setNewError("");
                          },
                          className: `pl-9 pr-10 transition-smooth ${newError ? "border-destructive focus-visible:ring-destructive" : ""}`,
                          "data-ocid": "reset-password.new_password_input",
                          autoFocus: true,
                          autoComplete: "new-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowNew((p) => !p),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                          "aria-label": showNew ? "Hide password" : "Show password",
                          children: showNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                        }
                      )
                    ] }),
                    newError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.p,
                      {
                        initial: { opacity: 0, y: -4 },
                        animate: { opacity: 1, y: 0 },
                        className: "text-xs text-destructive",
                        "data-ocid": "reset-password.new_password_field_error",
                        children: newError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "confirm-password",
                        className: "text-sm font-medium text-foreground",
                        children: "Confirm password"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "confirm-password",
                          type: showConfirm ? "text" : "password",
                          placeholder: "Re-enter your password",
                          value: confirmPassword,
                          onChange: (e) => {
                            setConfirmPassword(e.target.value);
                            if (confirmError) setConfirmError("");
                          },
                          className: `pl-9 pr-10 transition-smooth ${confirmError ? "border-destructive focus-visible:ring-destructive" : ""}`,
                          "data-ocid": "reset-password.confirm_password_input",
                          autoComplete: "new-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowConfirm((p) => !p),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                          "aria-label": showConfirm ? "Hide password" : "Show password",
                          children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                        }
                      )
                    ] }),
                    confirmError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.p,
                      {
                        initial: { opacity: 0, y: -4 },
                        animate: { opacity: 1, y: 0 },
                        className: "text-xs text-destructive",
                        "data-ocid": "reset-password.confirm_password_field_error",
                        children: confirmError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: loading || !newPassword || !confirmPassword,
                      className: "w-full font-medium",
                      "data-ocid": "reset-password.submit_button",
                      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Reset password"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground/60 mt-5", children: "Demo: Any matching passwords (min 6 chars) will work" })
              ] })
            }
          )
        ]
      }
    )
  ] });
}
export {
  ResetPasswordPage
};
